import { ProductsRepository } from '@/repositories/products-repository';
import {
  GetProductUseCaseRequest,
  GetProductUseCaseResponse,
} from '@/types/product-response';
import { normalizeProductResponse } from '@/utils/normalize-product-response';
import { Coupon, Product } from '@prisma/client';

export type ProductWithCoupons = Product & {
  Product_coupon_applications: {
    coupon: Coupon;
  }[];
};

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const productWithCoupon = (await this.productsRepository.findProductById(
      id
    )) as ProductWithCoupons;

    if (!productWithCoupon) {
      throw new Error('Product not found');
    }

    const normalizedProduct = normalizeProductResponse(productWithCoupon);

    return normalizedProduct;
  }
}
