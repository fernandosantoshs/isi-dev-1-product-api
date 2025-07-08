import { Prisma, Product, Product_coupon_applications } from '@prisma/client';
import { ProductsRepository } from '../products-repository';
import { Decimal } from '@prisma/client/runtime/library';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];

  async findManyProducts() {
    const products = this.items;

    return products;
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: this.items.length + 1,
      name: data.name,
      normalized_name: data.normalized_name,
      description: data.description ?? null,
      price: new Decimal(data.price.toString()),
      stock: data.stock,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    };

    this.items.push(product);

    return product;
  }

  async findProductByName(name: string) {
    const product = this.items.find((item) => item.normalized_name === name);

    return product ?? null;
  }

  async findProductById(id: number): Promise<Product | null> {
    const product = this.items.find((item) => item.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  findProducWithActiveCoupon(
    id: number
  ): Promise<Product_coupon_applications | null> {
    throw new Error('Method not implemented.');
  }

  updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  deleteProduct(id: number): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }

  restoreProduct(id: number): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }

  applyCouponToProduct(
    id: number,
    couponId: number
  ): Promise<Product_coupon_applications> {
    throw new Error('Method not implemented.');
  }

  incrementCouponUsesCount(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeCouponFromProduct(
    id: number,
    data: Prisma.Product_coupon_applicationsUpdateInput
  ): Promise<Product_coupon_applications> {
    throw new Error('Method not implemented.');
  }
}
