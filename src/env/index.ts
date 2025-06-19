import 'dotenv';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const envParse = envSchema.safeParse(process.env);

if (envParse.success == false) {
  console.error('Invalid enviroment variables', envParse.error.format());

  throw new Error('Invalid enviroment variables');
}

export const env = envParse.data;
