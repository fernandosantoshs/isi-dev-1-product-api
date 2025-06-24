import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchCouponsUseCase } from '@/factories/coupon/make-fetch-coupons-use-case';

export async function fetchCoupons(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchCouponsUseCase = makeFetchCouponsUseCase();

    const { coupons } = await fetchCouponsUseCase.execute();

    return reply.status(200).send(coupons);
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to fetch coupons' });
  }
}
