import { FastifyInstance } from 'fastify';
import { create } from './create';
import { fetchProducts } from './fetch-products';
import { getProduct } from './get-product';
import { updateProduct } from './update-product';

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', create);

  app.get('/products', fetchProducts);
  app.get('/products/:id', getProduct);

  app.patch('/products/:id', updateProduct);
}
