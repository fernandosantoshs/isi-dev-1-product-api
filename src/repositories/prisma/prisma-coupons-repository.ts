import { Prisma } from '@prisma/client';
import { CouponsRepository } from '../coupons-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCouponsRepository implements CouponsRepository {
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
