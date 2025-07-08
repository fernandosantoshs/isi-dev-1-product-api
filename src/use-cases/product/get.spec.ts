import { describe, beforeEach, it, expect } from 'vitest';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { GetProductUseCase } from './get';

let productsRepository: InMemoryProductsRepository;
let useCase: GetProductUseCase;

describe('Get Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    useCase = new GetProductUseCase(productsRepository);
  });

  it('should be able to get a product', async () => {
    const data = {
      name: 'Cafe',
      normalized_name: 'cafe',
      description: 'Arabica Premium 500g',
      price: 9.99,
      stock: 300,
    };

    await productsRepository.create(data);

    const product = await useCase.execute({ id: 1 });

    expect(product).toHaveProperty('id');
    expect(product.name).toEqual(data.name);
  });
});
