import { Prisma, Product } from '@prisma/client';
import { ProductsRepository } from '../products-repository';
import { Decimal } from '@prisma/client/runtime/library';

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: this.products.length + 1,
      name: data.name,
      description: data.description ?? null,
      price: new Decimal(data.price.toString()),
      stock: data.stock,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    };

    this.products.push(product);

    return product;
  }
}
