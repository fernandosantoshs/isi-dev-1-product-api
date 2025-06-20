import { prisma } from '@/lib/prisma';
import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';

interface CreateProductUseCaseRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

interface CreateProductUseCaseResponse {
  product: Product;
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    stock,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });

    return { product };
  }
}
