import crypto from 'node:crypto'

const razorpayBaseUrl = 'https://api.razorpay.com/v1'

function getCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured.')
  }
  return { keyId, keySecret }
}

export async function createRazorpayOrder(input: {
  amount: number
  receipt: string
  notes: Record<string, string>
}) {
  const { keyId, keySecret } = getCredentials()
  const response = await fetch(`${razorpayBaseUrl}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: 'INR',
      receipt: input.receipt,
      notes: input.notes,
    }),
    signal: AbortSignal.timeout(12_000),
  })
  if (!response.ok) {
    console.error('Razorpay order creation failed with status:', response.status)
    throw new Error('Razorpay could not create the payment order.')
  }
  return await response.json() as { id: string; amount: number; currency: string }
}

export function verifyRazorpaySignature(input: {
  orderId: string
  paymentId: string
  signature: string
}) {
  const { keySecret } = getCredentials()
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${input.orderId}|${input.paymentId}`)
    .digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(input.signature))
}

export function getRazorpayKeyId() {
  return getCredentials().keyId
}

export async function getRazorpayPayment(paymentId: string) {
  const { keyId, keySecret } = getCredentials()
  const response = await fetch(`${razorpayBaseUrl}/payments/${encodeURIComponent(paymentId)}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    signal: AbortSignal.timeout(12_000),
  })
  if (!response.ok) throw new Error('Razorpay payment lookup failed.')
  return await response.json() as {
    id: string
    order_id: string
    amount: number
    currency: string
    status: string
  }
}
