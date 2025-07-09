import fastify from 'fastify';
import { productsRoutes } from './http/controllers/products/routes';
import { couponsRoutes } from './http/controllers/coupons/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { AppError } from './use-cases/errors/app-errors';

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

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error);
  }

  return reply.status(500).send({ message: 'Internal server error' });
});
