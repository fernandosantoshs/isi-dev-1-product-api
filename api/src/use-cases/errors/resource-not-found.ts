import { AppError } from './app-errors';

export class ResourceNotFoundError extends AppError {
  constructor() {
    super('Resource not found', 404);
  }
}
