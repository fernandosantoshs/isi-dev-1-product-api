import { Coupon, Prisma } from '@prisma/client';

export interface CouponsRepository {
  create(data: Prisma.CouponCreateInput): Promise<Coupon>;
  findCouponByCode(code: string): Promise<Coupon | null>;
  findManyCoupons(): Promise<Coupon[]>;
  findCouponById(id: number): Promise<Coupon | null>;
  deleteCoupon(code: string): Promise<Coupon | null>;
  updateCoupon(code: string, data: Prisma.CouponUpdateInput): Promise<Coupon>;
}
