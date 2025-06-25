import { ProductsRepository } from '@/repositories/products-repository';
import {
  GetProductUseCaseRequest,
  ProductUseCaseResponse,
  ProductWithCoupons,
} from '@/types/product-response';
import { validateCoupon } from '@/utils/validate-coupon';

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const productWithCoupon = (await this.productsRepository.findProductById(
      id
    )) as ProductWithCoupons;

    if (!productWithCoupon) {
      throw new Error('Product not found');
    }

    const normalizedProduct = validateCoupon(productWithCoupon);

    return normalizedProduct;
  }
}
