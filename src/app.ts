import fastify from 'fastify';
import { productsRoutes } from './http/controllers/products/routes';
import { couponsRoutes } from './http/controllers/coupons/routes';

export const app = fastify();

app.addContentTypeParser(
  'application/json-patch+json',
  { parseAs: 'buffer' },
  function (_request, payload, done) {
    try {
      const json = JSON.parse(payload.toString());
      done(null, json);
    } catch (error: any) {
      error.statusCode = 400;
      done(error, undefined);
    }
  }
);

const apiPrefix = { prefix: '/api/v1' };

app.register(productsRoutes, apiPrefix);
app.register(couponsRoutes, apiPrefix);
