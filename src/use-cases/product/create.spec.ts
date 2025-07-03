import { describe, beforeEach, it, expect } from 'vitest';
import { CreateProductUseCase } from './create';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { ProductAlreadyExistsError } from '../errors/product-already-exists';

let productsRepository: InMemoryProductsRepository;
let useCase: CreateProductUseCase;

describe('Create Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    useCase = new CreateProductUseCase(productsRepository);
  });

  it('should be able to create a product', async () => {
    const data = {
      name: 'Oreo',
      description: 'Baunilha 80g',
      price: 9.99,
      stock: 300,
    };

    const { product } = await useCase.execute(data);

    expect(product).toHaveProperty('id');
    expect(product.name).toEqual(data.name);
  });

  it('should not be able to create a product with the same name', async () => {
    const data = {
      name: 'Oreo',
      description: 'Baunilha 80g',
      price: 9.99,
      stock: 300,
    };

    await useCase.execute(data);

    expect(async () => {
      await useCase.execute(data);
    }).rejects.toBeInstanceOf(ProductAlreadyExistsError);
  });
});
