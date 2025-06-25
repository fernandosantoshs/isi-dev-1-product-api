import { CouponsRepository } from '@/repositories/coupons-repository';
import { Coupon, CouponType, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface UpdateCouponUseCaseRequest {
  code: string;
  type?: CouponType;
  value?: number;
  one_shot?: boolean;
  max_uses?: number;
  uses_count?: number;
  valid_from?: Date;
  valid_until?: Date;
  deleted_at?: Date | null;
}

export class UpdateCouponUseCase {
  constructor(private couponsRepository: CouponsRepository) {}

  async execute({
    code,
    type,
    value,
    one_shot,
    max_uses,
    uses_count,
    valid_from,
    valid_until,
    deleted_at,
  }: UpdateCouponUseCaseRequest) {
    const updatedData: Partial<Coupon> = {
      type,
      value: value ? new Decimal(value) : undefined,
      one_shot,
      max_uses,
      uses_count,
      valid_from,
      valid_until,
      deleted_at,
      updated_at: new Date(),
    };

    const coupon = await this.couponsRepository.updateCoupon(code, updatedData);

    if (!coupon) {
      throw new Error('Coupon not found');
    }

    return coupon;
  }
}
