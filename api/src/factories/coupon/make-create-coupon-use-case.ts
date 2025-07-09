import { PrismaCouponsRepository } from '@/repositories/prisma/prisma-coupons-repository';
import { CreateCouponUseCase } from '@/use-cases/coupon/create';

export function makeCreateCouponUseCase() {
  const couponsRepository = new PrismaCouponsRepository();

  const useCase = new CreateCouponUseCase(couponsRepository);

  return useCase;
}
