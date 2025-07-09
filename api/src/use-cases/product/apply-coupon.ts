import { CouponsRepository } from '@/repositories/coupons-repository';
import { ProductsRepository } from '@/repositories/products-repository';
import { ProductWithCoupons } from '@/types/product-response';
import { validateCoupon } from '@/utils/validate-coupon';
import { Product_coupon_applications } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { CouponAlreadyExistsError } from '../errors/coupon-already-exists';
import { MismatchCouponTypeError } from '../errors/mismatch-coupon-type';
import { MaxUsesReachedError } from '../errors/max-uses-reached';

interface ApplyCouponUseCaseRequest {
  id: number;
  type: 'percent' | 'fixed';
  code: string;
}

type ApplyCouponUseCaseResponse = Product_coupon_applications;

export class ApplyCouponUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private couponsRepository: CouponsRepository
  ) {}

  async execute({
    id,
    type,
    code,
  }: ApplyCouponUseCaseRequest): Promise<ApplyCouponUseCaseResponse> {
    const productWithCoupon = (await this.productsRepository.findProductById(
      id
    )) as ProductWithCoupons;

    if (!productWithCoupon) {
      throw new ResourceNotFoundError();
    }

    const checkForActiveCoupons = validateCoupon(productWithCoupon);

    if (checkForActiveCoupons.hasCouponApplied) {
      throw new CouponAlreadyExistsError();
    }

    const coupon = await this.couponsRepository.findCouponByCode(code);

    if (coupon?.type !== type.toUpperCase()) {
      throw new MismatchCouponTypeError();
    }

    if (coupon?.one_shot && coupon?.uses_count >= 1) {
      throw new MaxUsesReachedError();
    }

    const product = await this.productsRepository.applyCouponToProduct(
      productWithCoupon.id,
      coupon.id
    );

    await this.productsRepository.incrementCouponUsesCount(coupon.id);

    return product;
  }
}
