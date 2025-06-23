import fastify from 'fastify';
import { productsRoutes } from './http/controllers/products/routes';

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

app.register(productsRoutes, { prefix: '/api/v1' });
