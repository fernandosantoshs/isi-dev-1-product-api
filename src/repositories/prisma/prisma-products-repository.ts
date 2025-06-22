import { Prisma, Product } from '@prisma/client';
import {
  FetchProductsFilters,
  ProductsRepository,
} from '../products-repository';
import { prisma } from '@/lib/prisma';

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    });

    return product;
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

    const products = await prisma.product.findMany({ where, orderBy });

    return products;
  }
}
