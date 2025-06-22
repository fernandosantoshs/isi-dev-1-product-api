import { FastifyInstance } from 'fastify';
import { create } from './create';
import { fetchProducts } from './fetch-products';

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', create);
  app.get('/products', fetchProducts);
}
