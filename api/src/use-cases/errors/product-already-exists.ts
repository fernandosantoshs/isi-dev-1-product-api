import { AppError } from './app-errors';

export class ProductAlreadyExistsError extends AppError {
  constructor() {
    super('Product already exists', 409);
  }
}
