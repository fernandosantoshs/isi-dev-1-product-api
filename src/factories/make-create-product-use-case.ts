import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { CreateProductUseCase } from '@/use-cases/create-product';

export async function makeCreateProductUseCase() {
  const productsRepository = new InMemoryProductsRepository();

  const useCase = new CreateProductUseCase(productsRepository);

  return useCase;
}
