import { makeCreateProductUseCase } from '@/factories/make-create-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    name: z
      .string()
      .min(3)
      .max(100)
      .regex(/^[a-zA-Z0-9\s\-_,.]+$`/),
    description: z.string().optional(),
    price: z.coerce.number().min(0.1),
    stock: z.coerce.number().min(0),
  });

  const { name, description, price, stock } = createProductBodySchema.parse(
    request.body
  );

  try {
    const createProductUseCase = makeCreateProductUseCase();

    await createProductUseCase.execute({
      name,
      description,
      price,
      stock,
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
