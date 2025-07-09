import { PrismaCouponsRepository } from '@/repositories/prisma/prisma-coupons-repository';
import { GetCouponUseCase } from '@/use-cases/coupon/get';

export function makeGetCouponUseCase() {
  const couponsRepository = new PrismaCouponsRepository();
  const useCase = new GetCouponUseCase(couponsRepository);

  return useCase;
}
