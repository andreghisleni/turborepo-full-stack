import { ZodArgs } from 'nestjs-graphql-zod';
import * as zod from 'zod';

export const FilterMemberObject = {
  name: zod.string().default('').describe('Filter'),
  page: zod.number().optional().default(0).describe('Page'),
  limit: zod.number().optional().default(20).describe('Limit'),
};

export const FilterMemberSchema = zod.object(FilterMemberObject).describe('FilterMemberInput:');

export type FilterMemberInput = ZodArgs.Of<typeof FilterMemberSchema>;
