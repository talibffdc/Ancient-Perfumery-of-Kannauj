import { z } from 'zod'
import { customFragranceProduct, CUSTOM_FRAGRANCE_SLUG } from '@/lib/custom-fragrance'
import { getDiwaliPrice } from '@/lib/diwali-offer'
import { shopCatalog } from '@/lib/shop-catalog'
import { createRazorpayOrder, getRazorpayKeyId } from '@/lib/razorpay'
import { getCouponDiscount } from '@/lib/order-offer'

const requestSchema = z.object({
  idempotencyKey: z.string().uuid(),
  couponCode: z.string().max(40).optional(),
  items: z.array(z.object({
    productSlug: z.string().min(1).max(80),
    variantId: z.string().min(1).max(80),
    quantity: z.number().int().min(1).max(10),
    customBrief: z.unknown().optional(),
  })).min(1).max(30),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid payment request.' }, { status: 400 })
  }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: 'Please check your cart.' }, { status: 400 })

  let amount = 0
  try {
    for (const item of parsed.data.items) {
      const product = item.productSlug === CUSTOM_FRAGRANCE_SLUG
        ? customFragranceProduct
        : shopCatalog.products.find((entry) => entry.slug === item.productSlug)
      const variant = product?.variants.find((entry) => entry.id === item.variantId)
      if (!product || !variant) return Response.json({ error: 'One selected product is no longer available.' }, { status: 400 })
      amount += (item.productSlug === CUSTOM_FRAGRANCE_SLUG ? variant.price : getDiwaliPrice(variant.price)) * item.quantity
    }
    const couponDiscount = getCouponDiscount(amount, parsed.data.couponCode)
    const razorpayOrder = await createRazorpayOrder({
      amount: (amount - couponDiscount) * 100,
      receipt: `KA-${parsed.data.idempotencyKey.replaceAll('-', '').slice(0, 20)}`,
      notes: { idempotencyKey: parsed.data.idempotencyKey },
    })
    return Response.json({
      keyId: getRazorpayKeyId(),
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (error) {
    console.error('Payment order setup failed:', error)
    return Response.json({ error: 'Online payment is temporarily unavailable.' }, { status: 503 })
  }
}
