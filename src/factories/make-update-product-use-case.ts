import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

import { UpdateProductUseCase } from '@/use-cases/product/update';

export function makeUpdateProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new UpdateProductUseCase(productsRepository);

  return useCase;
}
