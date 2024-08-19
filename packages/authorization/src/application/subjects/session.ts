import { z } from 'zod';

export const sessionSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get'), z.literal('update')]),
  z.literal('Session'),
]);

export type SessionSubject = z.infer<typeof sessionSubject>;
