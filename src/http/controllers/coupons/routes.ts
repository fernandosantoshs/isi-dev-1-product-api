import { FastifyInstance } from 'fastify';
import { create } from './create';
import { fetchCoupons } from './fetch';
import { getCoupon } from './get';
import { deleteCoupon } from './delete';

export async function couponsRoutes(app: FastifyInstance) {
  app.post('/coupons', create);

  app.get('/coupons', fetchCoupons);
  app.get('/coupons/:code', getCoupon);

  app.delete('/coupons/:code', deleteCoupon);
}
