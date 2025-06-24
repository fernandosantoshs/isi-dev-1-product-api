import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { CreateProductUseCase } from '@/use-cases/product/create';

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository();

  const useCase = new CreateProductUseCase(productsRepository);

  return useCase;
}
