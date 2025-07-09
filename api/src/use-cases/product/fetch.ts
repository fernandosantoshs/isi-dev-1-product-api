import {
  FetchProductsFilters,
  ProductsRepository,
} from '@/repositories/products-repository';
import { ProductUseCaseResponse } from '@/types/product-response';
import { validateCoupon } from '@/utils/validate-coupon';

type FetchProductsUseCaseRequest = FetchProductsFilters;

type FetchProductsUseCaseResponse = ProductUseCaseResponse[];

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    filters: FetchProductsUseCaseRequest
  ): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyProducts(filters);

    const normalizedProducts = products.map((product) => {
      return validateCoupon(product);
    });

    return normalizedProducts;
  }
}
