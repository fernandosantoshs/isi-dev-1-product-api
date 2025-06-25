import { makeUpdateCouponUseCase } from '@/factories/coupon/make-update-coupon-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function updateCoupon(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateCouponParamsSchema = z.object({
    code: z.string(),
  });

  const updateCouponBodySchema = z.object({
    type: z.enum(['PERCENT', 'FIXED']).optional(),
    value: z.coerce.number().positive().optional(),
    oneShot: z.boolean().optional(),
    max_uses: z.coerce.number().optional(),
    valid_from: z.coerce
      .date()
      .default(new Date())
      .refine((date) => {
        const now = new Date();
        return date >= now;
      })
      .optional(),
    valid_until: z.coerce
      .date()
      .default(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 5); // Default five years from creation

        return date;
      })
      .optional(),
    deleted_at: z.date().nullable().optional(),
  });

  const { code } = updateCouponParamsSchema.parse(request.params);
  const data = updateCouponBodySchema.parse(request.body);

  try {
    const updateCouponUseCase = makeUpdateCouponUseCase();

    await updateCouponUseCase.execute({ code, ...data });

    return reply.status(200).send();
  } catch (error) {
    throw error;
  }
}
