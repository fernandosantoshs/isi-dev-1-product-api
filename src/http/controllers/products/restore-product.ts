import { makeRestoreProductUseCase } from '@/factories/make-restore-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function restoreProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProductParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = deleteProductParamsSchema.parse(request.params);

  try {
    const deleteProductUseCase = makeRestoreProductUseCase();

    await deleteProductUseCase.execute(id);

    reply.status(200).send();
  } catch (error) {
    throw error;
  }
}
