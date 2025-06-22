import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';

interface FetchProductsUseCaseRequest {
  page: number;
  limit: number;
  search?: string;
  minPrice: number;
  maxPrice: number;
  hasDiscount: boolean;
  sortBy: string;
  sortOrder: string;
  includeDeleted: boolean;
  onlyOutOfStock: boolean;
  withCouponApplied: boolean;
}

interface FetchProductsUseCaseResponse {
  products: Product[];
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    filters: FetchProductsUseCaseRequest = {
      page: 1,
      limit: 0,
      minPrice: 0,
      maxPrice: 0,
      hasDiscount: false,
      sortBy: '',
      sortOrder: '',
      includeDeleted: false,
      onlyOutOfStock: false,
      withCouponApplied: false,
    }
  ): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyProducts(filters);

    return { products };
  }
}
