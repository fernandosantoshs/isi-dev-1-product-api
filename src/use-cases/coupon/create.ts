import { CouponsRepository } from '@/repositories/coupons-repository';
import { normalizeString } from '@/utils/normalize-string';
import { Coupon, CouponType } from '@prisma/client';
import { CouponAlreadyExistsError } from '../errors/coupon-already-exists';
import { DateOutOfPossibleRangeError } from '../errors/date-out-of-possible-range';

interface CreateCouponUseCaseRequest {
  code: string;
  type: CouponType;
  value: number;
  one_shot: boolean;
  max_uses: number;
  uses_count: number;
  valid_from: Date;
  valid_until: Date;
}

interface CreateCouponUseCaseResponse {
  coupon: Coupon;
}

export class CreateCouponUseCase {
  constructor(private couponsRepository: CouponsRepository) {}

  async execute({
    code,
    type,
    value,
    one_shot,
    max_uses,
    valid_from,
    valid_until,
  }: CreateCouponUseCaseRequest): Promise<CreateCouponUseCaseResponse> {
    const normalizedCode = normalizeString(code);

    const couponAlreadyExists =
      await this.couponsRepository.findCouponByCode(normalizedCode);

    if (couponAlreadyExists) {
      throw new CouponAlreadyExistsError();
    }

    const validFromPlus5Years = new Date(valid_from);
    validFromPlus5Years.setFullYear(validFromPlus5Years.getFullYear() + 5);

    if (valid_until > validFromPlus5Years) {
      throw new DateOutOfPossibleRangeError();
    }

    const coupon = await this.couponsRepository.create({
      code: normalizedCode,
      type,
      value,
      one_shot: one_shot ?? false,
      max_uses: max_uses ?? 0,
      uses_count: 0,
      valid_from,
      valid_until,
    });

    return { coupon };
  }
}
