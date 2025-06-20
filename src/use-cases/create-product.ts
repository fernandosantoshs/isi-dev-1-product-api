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
    const product = await this.productsRepository.create({
      name,
      description,
      price,
      stock,
    });

    // TODO : move this code to prisma product repository when created
    // const product = await prisma.product.create({
    // data: {
    //   name,
    //   description,
    //   price,
    //   stock,
    // },
    // });

    return { product };
  }
}
