import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

import { makeGetProductUseCase } from '@/factories/make-get-products-use-case';

export async function getProduct(request: FastifyRequest, reply: FastifyReply) {
  const getProductQueryParams = z.object({
    id: z.coerce.number(),
  });

  const { id } = getProductQueryParams.parse(request.params);

  try {
    const getProductUseCase = makeGetProductUseCase();

    const { product } = await getProductUseCase.execute(id);

    return reply.status(200).send(product);
  } catch (error) {
    throw error;
  }
}
