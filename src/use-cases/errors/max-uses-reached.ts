import { AppError } from './app-errors';

export class MaxUsesReachedError extends AppError {
  constructor() {
    super('Max uses reached for this coupon', 409);
  }
}
