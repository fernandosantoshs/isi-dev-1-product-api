import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface PatchOps {
  op: 'replace';
  path: '/price' | '/stock';
  value: string | number;
}

interface UpdateProductUseCaseRequest {
  id: number;
  operations: PatchOps[];
}

interface UpdateProductUseCaseResponse {
  product: Product;
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    operations,
  }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const product = await this.productsRepository.findProductById(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    let updatedData: Partial<Product> = { ...product, updated_at: new Date() };

    for (const operation of operations) {
      if (operation.op === 'replace') {
        const field = operation.path.replace('/', '') as keyof Product;

        updatedData[field] = operation.value as any;
      }
    }

    const updatedProduct = await this.productsRepository.updateProduct(
      id,
      updatedData
    );

    return { product: updatedProduct };
  }
}
