import { CouponsRepository } from '@/repositories/coupons-repository';
import { Coupon } from '@prisma/client';

interface FetchProductsUseCaseResponse {
  coupons: Coupon[];
}

export class FetchCouponsUseCase {
  constructor(private couponsRepository: CouponsRepository) {}

  async execute(): Promise<FetchProductsUseCaseResponse> {
    const coupons = await this.couponsRepository.findManyCoupons();

    return { coupons };
  }
}
