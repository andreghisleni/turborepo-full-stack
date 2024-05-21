import { z } from 'zod';

export const UpdateSessionSchema = z
  .object({
    id: z.string().uuid().describe('The session id'),
    organizationId: z.string().uuid().optional().describe('The organization id'),
  })
  .describe('UpdateSessionInput:');

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;
