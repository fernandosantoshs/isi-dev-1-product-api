import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { CreateProductUseCase } from '@/use-cases/create-product';

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository();

  const useCase = new CreateProductUseCase(productsRepository);

  return useCase;
}
