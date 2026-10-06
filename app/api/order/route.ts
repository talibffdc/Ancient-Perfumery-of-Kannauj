import { Resend } from 'resend'
import { after } from 'next/server'
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

type ConfirmedOrder = {
  orderId: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  items: Array<{
    productName: string
    variantName: string
    size: string
    quantity: number
    lineTotal: number
  }>
  subtotal: number
  shippingFee: number
  codFee: number
  total: number
}

async function sendOrderNotification(
  order: ConfirmedOrder,
  recipient: string,
  resendApiKey: string
) {
  const itemsHtml = order.items.map((item) => `
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
      replyTo: order.customer.email,
      subject: `New COD order ${order.orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#27231f;max-width:720px">
          <h1 style="font-family:Georgia,serif;font-weight:400">New Cash on Delivery Order</h1>
          <p><strong>Order reference:</strong> ${order.orderId}<br><strong>Order status:</strong> New</p>
          <h2>Customer</h2>
          <p>${escapeHtml(order.customer.name)}<br><a href="mailto:${escapeHtml(order.customer.email)}">${escapeHtml(order.customer.email)}</a><br>${escapeHtml(order.customer.phone)}</p>
          <p>${escapeHtml(order.customer.address)}<br>${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.region)} ${escapeHtml(order.customer.postalCode)}<br>${escapeHtml(order.customer.country)}</p>
          <h2>Items</h2>
          <table style="width:100%;border-collapse:collapse">
            <thead><tr><th style="text-align:left;padding:10px">Product</th><th>Qty</th><th style="text-align:right">Amount</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="text-align:right">
            Items: ${formatRupees(order.subtotal)}<br>
            Shipping: ${order.shippingFee === 0 ? 'Free' : formatRupees(order.shippingFee)}<br>
            COD fee: ${formatRupees(order.codFee)}<br>
            <strong>Collect on delivery: ${formatRupees(order.total)}</strong>
          </p>
          <hr>
          <p><strong>Dispatch:</strong> Pending · Update order status, courier, and tracking in the Orders sheet.</p>
        </div>
      `,
    })

    if (emailResult.error) {
      console.error('Order notification email failed:', emailResult.error)
    }
  } catch (error) {
    console.error('Order notification email failed:', error)
  }
}

export async function POST(request: Request) {
  const sheetsUrl = process.env.GOOGLE_SHEETS_ORDERS_URL
  const sheetsSecret = process.env.GOOGLE_SHEETS_ORDERS_SECRET
  const resendApiKey = process.env.RESEND_API_KEY

  if (!sheetsUrl || !sheetsSecret) {
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

  let spreadsheetResult: { success?: boolean; duplicate?: boolean; error?: string } | undefined
  let lastSheetFailure: string | undefined
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: sheetsSecret, order }),
        signal: AbortSignal.timeout(12_000),
      })

      if (!response.ok) {
        const requiresGoogleLogin =
          new URL(response.url).hostname === 'accounts.google.com' ||
          response.status === 401 ||
          response.status === 403
        console.error('Order spreadsheet request failed with status:', response.status)
        if (requiresGoogleLogin) {
          return Response.json(
            { error: 'Google Sheets is asking the server to sign in. Check the Apps Script Web app access settings.' },
            { status: 502 }
          )
        }
        if (response.status === 404) {
          return Response.json(
            { error: 'Google Apps Script returned HTTP 404. Verify the Production GOOGLE_SHEETS_ORDERS_URL ends in /exec, then redeploy.' },
            { status: 502 }
          )
        }
        lastSheetFailure = `HTTP ${response.status}`
      } else {
        const contentType = response.headers.get('content-type') ?? ''
        if (!contentType.includes('application/json')) {
          const requiresGoogleLogin = new URL(response.url).hostname === 'accounts.google.com'
          if (requiresGoogleLogin) {
            return Response.json(
              { error: 'Google Sheets is asking the server to sign in. Redeploy the Apps Script Web app with access set to “Anyone”.' },
              { status: 502 }
            )
          }
          lastSheetFailure = `Unexpected response type: ${contentType || 'unknown'}`
        } else {
          const result = await response.json() as {
            success?: boolean
            duplicate?: boolean
            error?: string
          }

          if (result.success) {
            spreadsheetResult = result
            break
          }
          if (result.error === 'Unauthorized') {
            return Response.json(
              { error: 'The Apps Script secret does not match GOOGLE_SHEETS_ORDERS_SECRET.' },
              { status: 502 }
            )
          }
          lastSheetFailure = result.error ?? 'Apps Script did not confirm saving the order'
        }
      }
    } catch (error) {
      console.error(`Order spreadsheet request failed (attempt ${attempt}):`, error)
      lastSheetFailure = error instanceof Error && error.name === 'TimeoutError'
        ? 'Apps Script response timed out'
        : 'Could not read the Apps Script response'
    }

    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
  }

  if (!spreadsheetResult?.success) {
    console.error('Order spreadsheet did not confirm the order after retry:', lastSheetFailure ?? 'Unknown error')
    return Response.json(
      {
        error: 'We could not confirm the order save. Please wait a moment and check your order status before submitting again.',
        retryable: true,
      },
      { status: 502 }
    )
  }

  if (spreadsheetResult.duplicate) {
    return Response.json({ success: true, orderId, duplicate: true })
  }

  let emailWarning: string | undefined
  if (!resendApiKey) {
    console.error('Order was saved, but RESEND_API_KEY is not configured; notification email was not scheduled.')
    emailWarning = 'Your order is saved, but the store notification email is not configured.'
  } else {
    const recipient = process.env.ORDER_NOTIFICATION_EMAIL ?? 'talibffdc@gmail.com'
    after(() => sendOrderNotification(order, recipient, resendApiKey))
  }

  return Response.json({ success: true, orderId, emailWarning })
}
