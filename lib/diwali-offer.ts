export const diwaliOffer = {
  name: 'Diwali Offer',
  discountPercent: 10,
  startDate: '2026-10-14',
  endDate: '2026-11-08',
  validFrom: '2026-10-14T00:00:00+05:30',
  validThrough: '2026-11-08T23:59:59+05:30',
} as const

export function isDiwaliOfferActive(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)

  return today >= diwaliOffer.startDate && today <= diwaliOffer.endDate
}

export function getDiwaliPrice(regularPrice: number, now = new Date()) {
  if (!isDiwaliOfferActive(now)) return regularPrice
  return Math.round(regularPrice * (1 - diwaliOffer.discountPercent / 100))
}
