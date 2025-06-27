import { AppError } from './app-errors';

export class MismatchCouponTypeError extends AppError {
  constructor() {
    super('Coupon type does not match', 400);
  }
}
