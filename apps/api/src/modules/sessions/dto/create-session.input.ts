import { z } from 'zod';

export const CreateSessionSchema = z
  .object({
    userId: z.string().uuid().describe('The user id'),
    memberId: z.string().uuid().optional().describe('The member id'),
  })
  .describe('CreateSessionInput:');

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;
