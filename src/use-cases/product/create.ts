import { ProductsRepository } from '@/repositories/products-repository';
import { normalizeString } from '@/utils/normalize-string';
import { Product } from '@prisma/client';
import { ProductAlreadyExists } from '../errors/product-already-exists';

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
    const normalizedName = normalizeString(name);

    const productAlreadyRegistered =
      await this.productsRepository.findProductByName(normalizedName);

    if (productAlreadyRegistered) {
      throw new ProductAlreadyExists();
    }

    const product = await this.productsRepository.create({
      name,
      normalized_name: normalizedName,
      description,
      price,
      stock,
    });

    return { product };
  }
}
