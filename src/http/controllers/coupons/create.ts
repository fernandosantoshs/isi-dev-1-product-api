import { makeCreateCouponUseCase } from '@/factories/coupon/make-create-coupon-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCouponBodySchema = z.object({
    code: z
      .string()
      .min(4)
      .max(20)
      .regex(/^[a-zA-Z0-9]+/, 'Invalid code')
      .trim(),
    type: z.enum(['PERCENT', 'FIXED']),
    value: z.coerce.number().positive(),
    oneShot: z.boolean().default(false),
    max_uses: z.coerce.number().default(0),
    valid_from: z.coerce
      .date()
      .default(new Date())
      .refine((date) => {
        const now = new Date();
        return date >= now;
      }),
    valid_until: z.coerce.date().default(() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 5); // Default five years from creation

      return date;
    }),
  });

  const { code, type, value, oneShot, valid_from, valid_until } =
    createCouponBodySchema.parse(request.body);

  try {
    const createCouponUseCase = makeCreateCouponUseCase();

    const { coupon } = await createCouponUseCase.execute({
      code,
      type,
      value,
      one_shot: oneShot,
      max_uses: 0,
      uses_count: 0,
      valid_from,
      valid_until,
    });

    return reply.status(201).send(coupon);
  } catch (error) {
    throw error;
  }
}
