import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.coerce.number().min(0.1),
    stock: z.coerce.number(),
  });

  const { name, description, price, stock } = createProductBodySchema.parse(
    request.body
  );

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
    },
  });

  return reply.status(201).send();
}
