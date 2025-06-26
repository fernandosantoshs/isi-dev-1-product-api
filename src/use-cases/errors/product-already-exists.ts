import { AppError } from './app-errors';

export class ProductAlreadyExists extends AppError {
  constructor() {
    super('Product already exists', 409);
  }
}
