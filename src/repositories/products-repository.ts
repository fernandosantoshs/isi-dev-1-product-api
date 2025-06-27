import { Prisma, Product, Product_coupon_applications } from '@prisma/client';

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
  findProducWithActiveCoupon(
    id: number
  ): Promise<Product_coupon_applications | null>;
  updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
  deleteProduct(id: number): Promise<Product | null>;
  restoreProduct(id: number): Promise<Product | null>;
  applyCouponToProduct(
    id: number,
    couponId: number
  ): Promise<Product_coupon_applications>;
  incrementCouponUsesCount(id: number): Promise<void>;
  removeCouponFromProduct(
    id: number,
    data: Prisma.Product_coupon_applicationsUpdateInput
  ): Promise<Product_coupon_applications>;
}
