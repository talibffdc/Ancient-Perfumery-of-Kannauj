import { Resend } from 'resend'
import { z } from 'zod'

import { shopCatalog } from '@/lib/shop-catalog'

const orderRequestSchema = z.object({
  idempotencyKey: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(20).regex(/^[0-9+() -]+$/),
  address: z.string().trim().min(5).max(500),
  city: z.string().trim().min(2).max(100),
  region: z.string().trim().min(2).max(100),
  postalCode: z.string().trim().regex(/^\d{6}$/),
  country: z.string().trim().min(2).max(80),
  paymentMethod: z.literal('COD'),
  items: z.array(z.object({
    productSlug: z.string().min(1).max(80),
    variantId: z.string().min(1).max(80),
    quantity: z.number().int().min(1).max(10),
  })).min(1).max(30),
  website: z.string().max(0).optional(),
})

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

function formatRupees(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export async function POST(request: Request) {
  const sheetsUrl = process.env.GOOGLE_SHEETS_ORDERS_URL
  const sheetsSecret = process.env.GOOGLE_SHEETS_ORDERS_SECRET
  const resendApiKey = process.env.RESEND_API_KEY

  if (!sheetsUrl || !sheetsSecret || !resendApiKey) {
    console.error('Order configuration is incomplete.')
    return Response.json(
      { error: 'Order placement is temporarily unavailable. Please contact us directly.' },
      { status: 503 }
    )
  }

  let requestBody: unknown
  try {
    requestBody = await request.json()
  } catch {
    return Response.json({ error: 'Invalid order request.' }, { status: 400 })
  }

  const parsed = orderRequestSchema.safeParse(requestBody)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check your order details.' },
      { status: 400 }
    )
  }

  const input = parsed.data
  if (input.country.toLowerCase() !== 'india') {
    return Response.json(
      { error: 'International orders require online payment, which is not available yet.' },
      { status: 400 }
    )
  }

  const orderItems = []
  for (const requestedItem of input.items) {
    const product = shopCatalog.products.find((entry) => entry.slug === requestedItem.productSlug)
    const variant = product?.variants.find((entry) => entry.id === requestedItem.variantId)

    if (!product || !variant) {
      return Response.json({ error: 'One of the selected products is no longer available.' }, { status: 400 })
    }

    orderItems.push({
      productSlug: product.slug,
      productName: product.name,
      variantId: variant.id,
      variantName: variant.name,
      size: variant.size,
      quantity: requestedItem.quantity,
      unitPrice: variant.price,
      lineTotal: variant.price * requestedItem.quantity,
    })
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0)
  const shippingFee = shopCatalog.fees.indiaShipping
  const codFee = shopCatalog.fees.indiaCodFee
  const total = subtotal + shippingFee + codFee
  const datePart = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  const orderId = `KA-${datePart}-${input.idempotencyKey.replaceAll('-', '').slice(0, 12).toUpperCase()}`
  const order = {
    orderId,
    createdAt: new Date().toISOString(),
    customer: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      city: input.city,
      region: input.region,
      postalCode: input.postalCode,
      country: 'India',
    },
    items: orderItems,
    subtotal,
    shippingFee,
    codFee,
    total,
    currency: 'INR',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Unpaid — collect on delivery',
    orderStatus: 'New',
    dispatchStatus: 'Pending',
  }

  let spreadsheetResult: { success?: boolean; duplicate?: boolean; error?: string }
  try {
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: sheetsSecret, order }),
      signal: AbortSignal.timeout(20_000),
    })

    if (!response.ok) {
      const requiresGoogleLogin =
        new URL(response.url).hostname === 'accounts.google.com' ||
        response.status === 401 ||
        response.status === 403
      console.error('Order spreadsheet request failed with status:', response.status)
      return Response.json(
        {
          error: requiresGoogleLogin
            ? 'Google Sheets is asking the server to sign in. In Apps Script, deploy a new Web app version with “Execute as: Me” and “Who has access: Anyone”, then update the /exec URL if it changed.'
            : `Google Sheets could not accept the order (HTTP ${response.status}). Check the Apps Script deployment and executions, then try again.`,
        },
        { status: 502 }
      )
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      const requiresGoogleLogin = new URL(response.url).hostname === 'accounts.google.com'
      console.error('Order spreadsheet returned a non-JSON response:', contentType)
      return Response.json(
        {
          error: requiresGoogleLogin
            ? 'Google Sheets is asking the server to sign in. Redeploy the Apps Script Web app with access set to “Anyone”.'
            : 'Google Sheets returned an unexpected response. Confirm the Web app /exec URL and deploy the latest script version.',
        },
        { status: 502 }
      )
    }

    spreadsheetResult = await response.json()
  } catch (error) {
    console.error('Order spreadsheet request failed:', error)
    return Response.json(
      { error: 'We could not save the order yet. Please try again or contact us.' },
      { status: 502 }
    )
  }

  if (!spreadsheetResult.success) {
    console.error('Order spreadsheet did not confirm the order:', spreadsheetResult.error ?? 'Unknown error')
    return Response.json(
      {
        error: spreadsheetResult.error === 'Unauthorized'
          ? 'The Apps Script secret does not match. Set Script Property ORDER_WEBHOOK_SECRET to the exact value of GOOGLE_SHEETS_ORDERS_SECRET, then redeploy.'
          : 'The Apps Script received the request but could not record it. Check Apps Script → Executions and confirm the Orders tab can be created/edited.',
      },
      { status: 502 }
    )
  }

  if (spreadsheetResult.duplicate) {
    return Response.json({ success: true, orderId, duplicate: true })
  }

  let emailWarning: string | undefined
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL ?? 'talibffdc@gmail.com'
  const itemsHtml = orderItems.map((item) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #e5e5e5">${escapeHtml(item.productName)} · ${escapeHtml(item.variantName)} (${escapeHtml(item.size)})</td>
      <td style="padding:10px;border-bottom:1px solid #e5e5e5;text-align:center">${item.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #e5e5e5;text-align:right">${formatRupees(item.lineTotal)}</td>
    </tr>
  `).join('')

  try {
    const resend = new Resend(resendApiKey)
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipient,
      replyTo: input.email,
      subject: `New COD order ${orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#27231f;max-width:720px">
          <h1 style="font-family:Georgia,serif;font-weight:400">New Cash on Delivery Order</h1>
          <p><strong>Order reference:</strong> ${orderId}<br><strong>Order status:</strong> New</p>
          <h2>Customer</h2>
          <p>${escapeHtml(input.name)}<br><a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a><br>${escapeHtml(input.phone)}</p>
          <p>${escapeHtml(input.address)}<br>${escapeHtml(input.city)}, ${escapeHtml(input.region)} ${escapeHtml(input.postalCode)}<br>${escapeHtml(input.country)}</p>
          <h2>Items</h2>
          <table style="width:100%;border-collapse:collapse">
            <thead><tr><th style="text-align:left;padding:10px">Product</th><th>Qty</th><th style="text-align:right">Amount</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="text-align:right">
            Items: ${formatRupees(subtotal)}<br>
            Shipping: ${shippingFee === 0 ? 'Free' : formatRupees(shippingFee)}<br>
            COD fee: ${formatRupees(codFee)}<br>
            <strong>Collect on delivery: ${formatRupees(total)}</strong>
          </p>
          <hr>
          <p><strong>Dispatch:</strong> Pending · Update order status, courier, and tracking in the Orders sheet.</p>
        </div>
      `,
    })

    if (emailResult.error) {
      console.error('Order notification email failed:', emailResult.error)
      emailWarning = 'Order saved, but the store notification email could not be sent. Please check the mail service.'
    }
  } catch (error) {
    console.error('Order notification email failed:', error)
    emailWarning = 'Order saved, but the store notification email could not be sent. Please check the mail service.'
  }

  return Response.json({ success: true, orderId, emailWarning })
}
