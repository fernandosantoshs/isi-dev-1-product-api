import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface RestoreProductUseCaseResponse {
  product: Product;
}

export class RestoreProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: number): Promise<RestoreProductUseCaseResponse> {
    const product = await this.productsRepository.restoreProduct(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    return { product };
  }
}
