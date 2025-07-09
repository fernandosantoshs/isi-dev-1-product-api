import { PrismaCouponsRepository } from '@/repositories/prisma/prisma-coupons-repository';
import { UpdateCouponUseCase } from '@/use-cases/coupon/update';

export function makeUpdateCouponUseCase() {
  const couponsRepository = new PrismaCouponsRepository();
  const useCase = new UpdateCouponUseCase(couponsRepository);

  return useCase;
}
