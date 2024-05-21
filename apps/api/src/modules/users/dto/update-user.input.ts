import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const UpdateUserSchema = z
  .object({
    name: z.string().optional().describe('The name of the user'),
  })
  .describe('UpdateUserInput:');

export type UpdateUserInput = ZodArgs.Of<typeof UpdateUserSchema>;
