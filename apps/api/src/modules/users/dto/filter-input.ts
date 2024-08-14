import { ZodArgs } from 'nestjs-graphql-zod';
import * as zod from 'zod';

export const FilterUserObject = {
  name: zod.string().default('').describe('Filter'),
  page: zod.number().optional().default(0).describe('Page'),
  limit: zod.number().optional().default(20).describe('Limit'),
};

export const FilterUserSchema = zod.object(FilterUserObject).describe('FilterUserInput:');

export type FilterUserInput = ZodArgs.Of<typeof FilterUserSchema>;
