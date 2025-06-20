import fastify from 'fastify';
import { productsRoutes } from './http/controllers/products/routes';

export const app = fastify();

app.register(productsRoutes);
