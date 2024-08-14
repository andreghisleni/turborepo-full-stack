import { z } from 'zod';

export const inviteSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('accept'), z.literal('reject'), z.literal('get')]),
  z.literal('Invite'),
]);

export type InviteSubject = z.infer<typeof inviteSubject>;
