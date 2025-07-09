import { makeDeleteProductUseCase } from '@/factories/product/make-delete-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProductParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = deleteProductParamsSchema.parse(request.params);

  try {
    const deleteProductUseCase = makeDeleteProductUseCase();

    await deleteProductUseCase.execute(id);

    reply.status(204).send();
  } catch (error) {
    throw error;
  }
}
