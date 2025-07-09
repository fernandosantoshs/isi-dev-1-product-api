import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface DeleteProductUseCaseResponse {
  product: Product;
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: number): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.deleteProduct(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    return { product };
  }
}
