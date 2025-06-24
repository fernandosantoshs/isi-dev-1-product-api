import { makeUpdateProductUseCase } from '@/factories/product/make-update-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const patchProductQuerySchema = z.object({
    id: z.coerce.number(),
  });

  const patchProductBodySchema = z.array(
    z.object({
      op: z.literal('replace'),
      path: z.enum(['/price', '/stock']),
      value: z.coerce.number(),
    })
  );

  const { id } = patchProductQuerySchema.parse(request.params);
  const operations = patchProductBodySchema.parse(request.body);

  try {
    const updateProductUseCase = makeUpdateProductUseCase();

    await updateProductUseCase.execute({
      id,
      operations,
    });

    return reply.status(200).send();
  } catch (error) {
    throw error;
  }
}
