import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchProductsUseCase } from '@/factories/make-fetch-products-use-case';

export async function fetchProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchProductsQueryParams = z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(50).default(20),
      search: z.string().optional(),
      minPrice: z.coerce.number().min(0.01).max(1000000).default(0.01),
      maxPrice: z.coerce.number().min(0.01).max(1000000).default(0.01),
      hasDiscount: z.boolean().default(false),
      sortBy: z.enum(['name', 'price', 'created_at', 'stock']).default('name'),
      sortOrder: z.enum(['asc', 'desc']).default('asc'),
      includeDeleted: z.boolean().default(false),
      onlyOutOfStock: z.boolean().default(false),
      withCouponApplied: z.boolean().default(false),
    });

    const queryParams = fetchProductsQueryParams.parse(request.query);

    const fetchProductsUseCase = makeFetchProductsUseCase();
    const products = await fetchProductsUseCase.execute(queryParams);

    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to fetch products' });
  }
}
