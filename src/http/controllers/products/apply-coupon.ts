import { makeApplyCouponUseCase } from '@/factories/product/make-apply-coupon-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function applyCoupon(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const applyCouponBodySchema = z.object({
    code: z
      .string()
      .min(4)
      .max(20)
      .regex(/^[a-zA-Z0-9]+/, 'Invalid code')
      .trim(),
  });

  const applyCouponParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
    type: z.enum(['percent', 'fixed']),
  });

  const { code } = applyCouponBodySchema.parse(request.body);

  const { id, type } = applyCouponParamsSchema.parse(request.params);

  try {
    const applyCouponUseCase = makeApplyCouponUseCase();

    await applyCouponUseCase.execute({
      id,
      code,
      type,
    });

    return reply.status(200).send();
  } catch (error) {
    throw error;
  }
}
