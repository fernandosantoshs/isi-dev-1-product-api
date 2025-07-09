import { PrismaCouponsRepository } from '@/repositories/prisma/prisma-coupons-repository';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { ApplyCouponUseCase } from '@/use-cases/product/apply-coupon';

export function makeApplyCouponUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const couponsRepository = new PrismaCouponsRepository();

  const useCase = new ApplyCouponUseCase(productsRepository, couponsRepository);

  return useCase;
}
