import { Product, Coupon } from '@prisma/client';
import { calculateDiscount } from './calculate-product-discount';

type ProductWithCoupons = Product & {
  Product_coupon_applications?: { coupon: Coupon }[];
};

export function validateCoupon(productWithCoupon: ProductWithCoupons) {
  const MIN_PRICE = 0.01;

  const couponApplication = productWithCoupon.Product_coupon_applications?.[0];

  const price = Number(productWithCoupon.price);
  const coupon = couponApplication?.coupon;
  const isOutOfStock = productWithCoupon.stock == 0;
  let hasCouponApplied = false;
  let finalPrice = Number(productWithCoupon.price);

  if (coupon) {
    hasCouponApplied = true;

    finalPrice = calculateDiscount(price, {
      type: coupon.type,
      value: Number(coupon.value),
    });

    if (finalPrice < MIN_PRICE) {
      throw new Error(
        'Calculated price with discount cannot be less than 0.01'
      );
    }
  }

  const { discount } = {
    discount:
      hasCouponApplied && coupon
        ? {
            type: coupon.type,
            value: Number(coupon.value),
            applied_at: coupon.valid_from,
          }
        : null,
  };

  const { Product_coupon_applications, ...product } = productWithCoupon;

  return {
    id: productWithCoupon.id,
    name: productWithCoupon.name,
    description: productWithCoupon.description ?? undefined,
    stock: productWithCoupon.stock,
    is_out_of_stock: isOutOfStock,
    price: Number(productWithCoupon.price),
    finalPrice,
    discount,
    hasCouponApplied,
    created_at: productWithCoupon.created_at,
    updated_at: productWithCoupon.updated_at ?? undefined,
  };
}
