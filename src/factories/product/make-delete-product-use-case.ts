import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { DeleteProductUseCase } from '@/use-cases/product/delete';

export function makeDeleteProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new DeleteProductUseCase(productsRepository);

  return useCase;
}
