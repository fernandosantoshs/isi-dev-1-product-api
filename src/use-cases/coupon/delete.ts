import { CouponsRepository } from '@/repositories/coupons-repository';
import { normalizeString } from '@/utils/normalize-string';
import { Coupon } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface DeleteCouponUseCaseResponse {
  coupon: Coupon;
}

export class DeleteCouponUseCase {
  constructor(private couponsRepository: CouponsRepository) {}

  async execute(code: string): Promise<DeleteCouponUseCaseResponse> {
    const normalizedCode = normalizeString(code);

    const coupon = await this.couponsRepository.deleteCoupon(normalizedCode);

    if (!coupon) {
      throw new ResourceNotFoundError();
    }

    return { coupon };
  }
}
