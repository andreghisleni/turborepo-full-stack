import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const UpdateRoleSchema = z
  .object({
    userId: z.string(),
    // role: z.union([z.literal('ADMIN'), z.literal('DEFAULT')]),
    role: z.string(),
  })
  .describe('UpdateRoleInput:');

export type UpdateRoleInput = ZodArgs.Of<typeof UpdateRoleSchema>;
