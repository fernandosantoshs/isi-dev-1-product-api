import { FastifyInstance } from 'fastify';
import { create } from './create';
import { fetchProducts } from './fetch';
import { getProduct } from './get';
import { updateProduct } from './update';
import { deleteProduct } from './delete';
import { restoreProduct } from './restore';

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', create);
  app.post('/products/:id/restore', restoreProduct);

  app.get('/products', fetchProducts);
  app.get('/products/:id', getProduct);

  app.patch('/products/:id', updateProduct);

  app.delete('/products/:id', deleteProduct);
}
