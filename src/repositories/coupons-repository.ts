import { Coupon, Prisma } from '@prisma/client';

export interface CouponsRepository {
  create(data: Prisma.CouponCreateInput): Promise<Coupon>;
  findCouponByCode(name: string): Promise<Coupon | null>;
  findManyCoupons(): Promise<Coupon[]>;
}
