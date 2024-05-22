import { z } from 'zod';

export const UpdateSessionSchema = z
  .object({
    id: z.string().uuid().describe('The session id'),
    memberId: z.string().uuid().describe('The member id'),
  })
  .describe('UpdateSessionInput:');

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;
