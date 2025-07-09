import { AppError } from './app-errors';

export class MinumumPriceWithCouponError extends AppError {
  constructor() {
    super('Calculated price with discount cannot be less than 0.01', 422);
  }
}
