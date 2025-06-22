import {
  FetchProductsFilters,
  ProductsRepository,
} from '@/repositories/products-repository';
import { Product } from '@prisma/client';

type FetchProductsUseCaseRequest = FetchProductsFilters;
interface FetchProductsUseCaseResponse {
  products: Product[];
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    filters: FetchProductsUseCaseRequest
  ): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyProducts(filters);

    return { products };
  }
}
