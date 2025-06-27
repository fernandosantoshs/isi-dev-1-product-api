import { CouponsRepository } from '@/repositories/coupons-repository';
import { Coupon } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface GetCouponUseCaseResponse {
  coupon: Coupon;
}

export class GetCouponUseCase {
  constructor(private couponsRepository: CouponsRepository) {}

  async execute(code: string): Promise<GetCouponUseCaseResponse> {
    const coupon = await this.couponsRepository.findCouponByCode(code);

    if (!coupon) {
      throw new ResourceNotFoundError();
    }

    return { coupon };
  }
}
