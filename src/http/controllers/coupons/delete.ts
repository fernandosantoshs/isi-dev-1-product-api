import { makeDeleteCouponUseCase } from '@/factories/coupon/make-delete-coupon-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function deleteCoupon(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteCouponParamsSchema = z.object({
    code: z
      .string()
      .min(4)
      .max(20)
      .regex(/^[a-zA-Z0-9]+/, 'Invalid code')
      .trim(),
  });

  const { code } = deleteCouponParamsSchema.parse(request.params);

  try {
    const deleteCouponUseCase = makeDeleteCouponUseCase();

    await deleteCouponUseCase.execute(code);

    reply.status(204).send();
  } catch (error) {
    throw error;
  }
}
