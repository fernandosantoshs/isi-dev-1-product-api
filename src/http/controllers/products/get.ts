import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

import { makeGetProductUseCase } from '@/factories/product/make-get-products-use-case';

export async function getProduct(request: FastifyRequest, reply: FastifyReply) {
  const getProductQueryParams = z.object({
    id: z.coerce.number(),
  });

  const { id } = getProductQueryParams.parse(request.params);

  try {
    const getProductUseCase = makeGetProductUseCase();

    const normalizedProduct = await getProductUseCase.execute({ id });

    return reply.status(200).send({
      data: [normalizedProduct],
      meta: {
        page: 1,
        limit: 1,
        totalItems: 1,
        totalPages: 1,
      },
    });
  } catch (error) {
    throw error;
  }
}
