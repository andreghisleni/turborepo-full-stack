import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const CreateInviteObject = {
  email: z.string().email().describe('The email of the invite'),
  role: z.enum(['ADMIN', 'MEMBER', 'BILLING']).describe('The role of the invite'),
};

export const CreateInviteSchema = z.object(CreateInviteObject).describe('CreateInviteInput:');

export type CreateInviteInput = ZodArgs.Of<typeof CreateInviteSchema>;
