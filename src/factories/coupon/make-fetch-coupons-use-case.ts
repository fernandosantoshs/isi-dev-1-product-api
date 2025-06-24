import { PrismaCouponsRepository } from '@/repositories/prisma/prisma-coupons-repository';
import { FetchCouponsUseCase } from '@/use-cases/coupon/fetch';

export function makeFetchCouponsUseCase() {
  const couponsRepository = new PrismaCouponsRepository();
  const useCase = new FetchCouponsUseCase(couponsRepository);

  return useCase;
}
