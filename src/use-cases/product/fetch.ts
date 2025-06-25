import {
  FetchProductsFilters,
  ProductsRepository,
} from '@/repositories/products-repository';
import { GetProductUseCaseResponse } from '@/types/product-response';
import { normalizeProductResponse } from '@/utils/normalize-product-response';

type FetchProductsUseCaseRequest = FetchProductsFilters;

type FetchProductsUseCaseResponse = GetProductUseCaseResponse[];

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    filters: FetchProductsUseCaseRequest
  ): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyProducts(filters);

    const normalizedProducts = products.map((product) => {
      return normalizeProductResponse(product);
    });

    return normalizedProducts;
  }
}
