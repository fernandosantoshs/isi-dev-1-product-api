import { FastifyInstance } from 'fastify';
import { create } from './create';
import { fetchProducts } from './fetch-products';
import { getProduct } from './get-product';
import { updateProduct } from './update-product';
import { deleteProduct } from './delete-product';
import { restoreProduct } from './restore-product';

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', create);
  app.post('/products/:id/restore', restoreProduct);

  app.get('/products', fetchProducts);
  app.get('/products/:id', getProduct);

  app.patch('/products/:id', updateProduct);

  app.delete('/products/:id', deleteProduct);
}
