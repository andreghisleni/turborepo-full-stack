import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const UpdateRoleSchema = z
  .object({
    userId: z.string(),
    role: z.enum(['ADMIN', 'DEFAULT']),
  })
  .describe('UpdateRoleInput:');

export type UpdateRoleInput = ZodArgs.Of<typeof UpdateRoleSchema>;
