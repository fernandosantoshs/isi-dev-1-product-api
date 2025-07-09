import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetCouponUseCase } from '@/factories/coupon/make-get-coupon-use-case';
import z from 'zod';

export async function getCoupon(request: FastifyRequest, reply: FastifyReply) {
  const getCouponParamsSchema = z.object({
    code: z.string().min(4).max(20).trim(),
  });

  const { code } = getCouponParamsSchema.parse(request.params);

  try {
    const getCouponUseCase = makeGetCouponUseCase();

    const { coupon } = await getCouponUseCase.execute(code);

    return reply.status(200).send(coupon);
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to get coupon' });
  }
}
