import { ProductsRepository } from '@/repositories/products-repository';
import { Coupon, Product_coupon_applications } from '@prisma/client';

interface RemoveCouponUseCaseRequest {
  id: number;
}

export class RemoveCouponUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: RemoveCouponUseCaseRequest): Promise<Product_coupon_applications> {
    const product = await this.productsRepository.findProductById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    const activeCoupon =
      await this.productsRepository.findProducWithActiveCoupon(id);

    if (!activeCoupon) {
      throw new Error('No active coupon in this product');
    }

    const data = { removed_at: new Date() };

    const coupon = await this.productsRepository.removeCouponFromProduct(
      id,
      data
    );

    const updatedAt = { updated_at: new Date() };

    await this.productsRepository.updateProduct(product.id, updatedAt);

    return coupon;
  }
}
