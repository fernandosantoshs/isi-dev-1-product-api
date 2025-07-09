export function calculateDiscount(
  price: number,
  coupon: { type: string; value: number }
) {
  if (coupon.type === 'PERCENT') {
    return price - (price * coupon.value) / 100;
  }
  if (coupon.type === 'FIXED') {
    return price - coupon.value;
  }
  throw new Error('Error calculating discount');
}
