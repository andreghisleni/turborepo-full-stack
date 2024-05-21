import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const CreateUserObject = {
  name: z.string().describe('The name of the user'),
  email: z.string().email().describe('The email of the user'),
  password: z.string().min(6).describe('The password of the user'),
};

export const CreateUserSchema = z.object(CreateUserObject).describe('CreateUserInput:');

export type CreateUserInput = ZodArgs.Of<typeof CreateUserSchema>;
