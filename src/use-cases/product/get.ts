import { ProductsRepository } from '@/repositories/products-repository';
import { calculateDiscount } from '@/utils/calculate-product-discount';
import { Coupon, Product } from '@prisma/client';

type ProductWithCoupons = Product & {
  Product_coupon_applications: {
    coupon: Coupon;
  }[];
};

interface Discount {
  type: string;
  value: number;
  applied_at: Date;
}
interface GetProductUseCaseRequest {
  id: number;
}
interface GetProductUseCaseResponse {
  id: number;
  name: string;
  description?: string;
  stock: number;
  is_out_of_stock: boolean;
  price: number;
  finalPrice: number;
  discount: Discount | null;
  hasCouponApplied: boolean;
  created_at: Date;
  updated_at?: Date;
}

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

    const MIN_PRICE = 0.01;

    const price = Number(productWithCoupon.price);
    const coupon = productWithCoupon.Product_coupon_applications[0].coupon;
    const isOutOfStock = productWithCoupon.stock == 0;
    let hasCouponApplied = false;
    let finalPrice = Number(productWithCoupon.price);

    if (productWithCoupon.Product_coupon_applications.length > 0) {
      hasCouponApplied = true;

      finalPrice = calculateDiscount(price, {
        type: coupon.type,
        value: Number(coupon.value),
      });

      if (finalPrice < MIN_PRICE) {
        throw new Error(
          'Calculated price with discount cannot be less than 0.01'
        );
      }
    }

    const { discount } = {
      discount: hasCouponApplied
        ? {
            type: coupon.type,
            value: Number(coupon.value),
            applied_at: coupon.valid_from,
          }
        : null,
    };

    const { Product_coupon_applications, ...product } = productWithCoupon;

    return {
      id: product.id,
      name: product.name,
      description: product.description ?? undefined,
      stock: product.stock,
      is_out_of_stock: isOutOfStock,
      price: Number(product.price),
      finalPrice,
      discount,
      hasCouponApplied,
      created_at: product.created_at,
      updated_at: product.updated_at ?? undefined,
    };
  }
}
