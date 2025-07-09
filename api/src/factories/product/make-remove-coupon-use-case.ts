import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { RemoveCouponUseCase } from '@/use-cases/product/remove-coupon';

export function makeRemoveCouponUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new RemoveCouponUseCase(productsRepository);

  return useCase;
}
