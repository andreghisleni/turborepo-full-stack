import { z } from 'zod';

import { userSubjectSchema } from '../models/user';

export const userSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get'), z.literal('update'), z.literal('send-temporary-password'), z.literal('activate'), z.literal('block')]),
  z.union([z.literal('User'), userSubjectSchema]),
]);

export type UserSubject = z.infer<typeof userSubject>;
