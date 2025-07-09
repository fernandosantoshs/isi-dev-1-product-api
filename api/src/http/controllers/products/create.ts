import { makeCreateProductUseCase } from '@/factories/product/make-create-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    name: z
      .string()
      .min(3)
      .max(100)
      .regex(/^[\p{L}0-9\s\-_,.%]+$/u, 'Invalid name')
      .trim(),
    description: z
      .string()
      .regex(/^[\p{L}0-9\s\-_,.%&*]+$/u, 'Invalid description')
      .trim()
      .optional(),
    price: z.coerce.number().min(0.1),
    stock: z.coerce.number().min(0),
  });

  const { name, description, price, stock } = createProductBodySchema.parse(
    request.body
  );

  try {
    const createProductUseCase = makeCreateProductUseCase();

    const { product } = await createProductUseCase.execute({
      name,
      description,
      price,
      stock,
    });

    const locationHeader = `/products/${product.id}`;

    return reply.status(201).header('Location', locationHeader).send();
  } catch (error) {
    throw error;
  }
}
