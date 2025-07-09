import { AppError } from './app-errors';

export class DateOutOfPossibleRangeError extends AppError {
  constructor() {
    super(
      'valid_until must be less than or equal to 5 years from valid_from',
      400
    );
  }
}
