import { Prisma, Product } from '@prisma/client';

export interface FetchProductsFilters {
  page: number;
  limit: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  hasDiscount?: boolean;
  sortBy: string;
  sortOrder: string;
  includeDeleted?: boolean;
  onlyOutOfStock?: boolean;
  withCouponApplied?: boolean;
}

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  findManyProducts(filters: FetchProductsFilters): Promise<Product[]>;
  findProductByName(name: string): Promise<Product | null>;
  findProductById(id: number): Promise<Product | null>;
}
