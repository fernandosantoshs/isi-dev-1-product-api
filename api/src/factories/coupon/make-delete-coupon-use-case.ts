import { PrismaCouponsRepository } from '@/repositories/prisma/prisma-coupons-repository';
import { DeleteCouponUseCase } from '@/use-cases/coupon/delete';

export function makeDeleteCouponUseCase() {
  const couponsRepository = new PrismaCouponsRepository();
  const useCase = new DeleteCouponUseCase(couponsRepository);

  return useCase;
}
