import { Prisma, Product } from '@prisma/client';
import {
  FetchProductsFilters,
  ProductsRepository,
} from '../products-repository';
import { prisma } from '@/lib/prisma';

export class PrismaProductsRepository implements ProductsRepository {
  deleteProduct(productId: number) {
    const deletedProduct = prisma.product.update({
      where: { id: productId },
      data: { deleted_at: new Date() },
    });

    return deletedProduct;
  }

  async findProductById(productId: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    return product;
  }

  async findProductByName(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        normalized_name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return product;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    });

    return product;
  }

  updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    const updatedProduct = prisma.product.update({
      where: { id },
      data,
    });

    return updatedProduct;
  }

  async findManyProducts(filters: FetchProductsFilters): Promise<Product[]> {
    const {
      page,
      limit,
      search,
      minPrice,
      maxPrice,
      hasDiscount,
      sortBy,
      sortOrder,
      includeDeleted,
      onlyOutOfStock,
      withCouponApplied,
    } = filters;

    const where: Prisma.ProductWhereInput = {};

    const orderBy = { [sortBy]: sortOrder };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice) {
      where.price = { gte: minPrice };
    }

    if (maxPrice) {
      where.price = { lte: maxPrice };
    }

    if (hasDiscount) {
      where.Product_coupon_applications = { some: {} };
    }

    if (!includeDeleted) {
      where.deleted_at = null;
    }

    if (onlyOutOfStock) {
      where.stock = { equals: 0 };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: page - 1,
      take: limit,
    });

    return products;
  }
}
