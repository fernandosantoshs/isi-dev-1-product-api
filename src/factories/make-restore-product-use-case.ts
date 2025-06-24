import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

import { RestoreProductUseCase } from '@/use-cases/restore-product';

export function makeRestoreProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new RestoreProductUseCase(productsRepository);

  return useCase;
}
