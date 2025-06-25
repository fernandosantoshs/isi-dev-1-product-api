import { makeRemoveCouponUseCase } from '@/factories/product/make-remove-coupon-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function removeCoupon(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const removeCouponParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = removeCouponParamsSchema.parse(request.params);

  try {
    const removeCouponUseCase = makeRemoveCouponUseCase();

    await removeCouponUseCase.execute({ id });

    reply.status(204).send();
  } catch (error) {
    throw error;
  }
}
