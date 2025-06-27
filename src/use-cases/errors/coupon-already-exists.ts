import { AppError } from './app-errors';

export class CouponAlreadyExistsError extends AppError {
  constructor() {
    super('Coupon code already exists or already applied to product', 409);
  }
}
