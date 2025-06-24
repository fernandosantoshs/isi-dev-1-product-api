import { Coupon, Prisma } from '@prisma/client';
import { CouponsRepository } from '../coupons-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCouponsRepository implements CouponsRepository {
  async findManyCoupons(): Promise<Coupon[]> {
    const coupons = await prisma.coupon.findMany({
      orderBy: { created_at: 'desc' },
    });

    return coupons;
  }

  async create(data: Prisma.CouponCreateInput) {
    const coupon = await prisma.coupon.create({
      data,
    });

    return coupon;
  }

  async findCouponByCode(code: string) {
    const coupon = await prisma.coupon.findFirst({
      where: { code },
    });

    return coupon;
  }
}
