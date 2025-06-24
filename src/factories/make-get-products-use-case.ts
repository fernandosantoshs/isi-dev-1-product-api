import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { GetProductUseCase } from '@/use-cases/product/get';

export function makeGetProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new GetProductUseCase(productsRepository);

  return useCase;
}
