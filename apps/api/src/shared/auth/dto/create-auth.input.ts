import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const CreateAuthSchema = z
  .object({
    email: z.string().email().describe('The email of the user'),
    password: z.string().min(6).describe('The password of the user'),
  })
  .describe('CreateAuthInput:');

export type CreateAuthInput = ZodArgs.Of<typeof CreateAuthSchema>;
