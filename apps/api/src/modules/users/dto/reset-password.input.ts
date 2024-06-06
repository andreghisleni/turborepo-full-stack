import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    tokenId: z.string(),
    password: z.string().min(6),
  })
  .describe('ResetPasswordInput:');

export type ResetPasswordInput = ZodArgs.Of<typeof ResetPasswordSchema>;
