import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';

interface GetProductUseCaseResponse {
  product: Product;
}

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: number): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findProductById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return { product };
  }
}
