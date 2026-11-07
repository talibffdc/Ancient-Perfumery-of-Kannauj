export const ONLINE_PAYMENT_SAVING = 49
export const FREE_GIFT_THRESHOLD = 3149
export const FREE_GIFT_NAME = '2 ml Natural Pure Zafrani Rose Oudh'
export const COUPON_CODE = 'KANNAUJATTAR10'
export const COUPON_DISCOUNT_PERCENT = 10

export function qualifiesForFreeGift(subtotal: number) {
  return subtotal >= FREE_GIFT_THRESHOLD
}

export function getCouponDiscount(subtotal: number, couponCode?: string) {
  if (couponCode?.trim().toUpperCase() !== COUPON_CODE) return 0
  return Math.round(subtotal * COUPON_DISCOUNT_PERCENT / 100)
}
