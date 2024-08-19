import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const UpdateMemberRoleSchema = z
  .object({
    memberId: z.string(),
    role: z.enum(['ADMIN', 'MEMBER', 'BILLING']),
  })
  .describe('UpdateMemberRoleInput:');

export type UpdateMemberRoleInput = ZodArgs.Of<typeof UpdateMemberRoleSchema>;
