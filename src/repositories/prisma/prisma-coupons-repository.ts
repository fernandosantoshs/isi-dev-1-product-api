import { Coupon, Prisma } from '@prisma/client';
import { CouponsRepository } from '../coupons-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCouponsRepository implements CouponsRepository {
  async create(data: Prisma.CouponCreateInput) {
    const coupon = await prisma.coupon.create({
      data,
    });

    return coupon;
  }

  async deleteCoupon(code: string) {
    const coupon = await prisma.coupon.update({
      where: {
        code,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return coupon;
  }

  async findCouponById(couponId: number) {
    const coupon = await prisma.coupon.findFirst({
      where: { id: couponId },
    });

    return coupon;
  }

  async findCouponByCode(code: string) {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code: {
          equals: code,
          mode: 'insensitive',
        },
      },
    });

    return coupon;
  }

  async findManyCoupons(): Promise<Coupon[]> {
    const coupons = await prisma.coupon.findMany({
      orderBy: { created_at: 'desc' },
    });

    return coupons;
  }

  async updateCoupon(code: string, data: Prisma.CouponUpdateInput) {
    const coupon = await prisma.coupon.update({
      where: {
        code,
      },
      data,
    });

    return coupon;
  }
}
