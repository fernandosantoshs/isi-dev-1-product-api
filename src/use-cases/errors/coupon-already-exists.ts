import { AppError } from './app-errors';

export class CouponAlreadyExistsError extends AppError {
  constructor() {
    super('Coupon already exists', 409);
  }
}
