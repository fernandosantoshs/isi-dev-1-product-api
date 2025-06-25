import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchProductsUseCase } from '@/factories/product/make-fetch-products-use-case';

export async function fetchProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchProductsQueryParams = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
    search: z.string().optional(),
    minPrice: z.coerce.number().min(0.01).max(1000000).optional(),
    maxPrice: z.coerce.number().min(0.01).max(1000000).optional(),
    hasDiscount: z.coerce.boolean().optional(),
    sortBy: z.enum(['name', 'price', 'created_at', 'stock']).default('name'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    includeDeleted: z.coerce.boolean().optional(),
    onlyOutOfStock: z.coerce.boolean().optional(),
    withCouponApplied: z.coerce.boolean().optional(),
  });

  const queryParams = fetchProductsQueryParams.parse(request.query);

  try {
    const fetchProductsUseCase = makeFetchProductsUseCase();
    const products = await fetchProductsUseCase.execute(queryParams);

    return reply.status(200).send({
      data: products,
      meta: {
        page: queryParams.page,
        limit: queryParams.limit,
        totalItems: products.length,
        totalPages: Math.ceil(products.length / queryParams.limit),
      },
    });
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to fetch products' });
  }
}
