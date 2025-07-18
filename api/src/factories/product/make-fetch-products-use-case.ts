import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { FetchProductsUseCase } from '@/use-cases/product/fetch';

export function makeFetchProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new FetchProductsUseCase(productsRepository);

  return useCase;
}
