import { FastifyInstance } from 'fastify';
import { create } from './create';

export async function couponsRoutes(app: FastifyInstance) {
  app.post('/coupons', create);
}
