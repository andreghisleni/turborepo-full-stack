import { ZodArgs } from 'nestjs-graphql-zod';
import * as zod from 'zod';

export const FilterObject = {
  filter: zod.string().default('').describe('Filter'),
  page: zod.number().optional().default(0).describe('Page'),
  limit: zod.number().optional().default(20).describe('Limit'),
};

export const FilterSchema = zod.object(FilterObject).describe('FilterInput:');

export type FilterInput = ZodArgs.Of<typeof FilterSchema>;
