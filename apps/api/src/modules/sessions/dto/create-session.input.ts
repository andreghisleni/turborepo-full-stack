import { z } from 'zod';

export const CreateSessionSchema = z
  .object({
    userId: z.string().uuid().describe('The user id'),
    organizationId: z.string().uuid().optional().describe('The organization id'),
  })
  .describe('CreateSessionInput:');

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;
