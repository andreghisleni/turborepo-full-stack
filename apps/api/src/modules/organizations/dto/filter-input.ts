import { ZodArgs } from 'nestjs-graphql-zod';
import * as zod from 'zod';

export const FilterOrganizationObject = {
  name: zod.string().default('').describe('Filter'),
  page: zod.number().optional().default(0).describe('Page'),
  limit: zod.number().optional().default(20).describe('Limit'),
};

export const FilterOrganizationSchema = zod
  .object(FilterOrganizationObject)
  .describe('FilterOrganizationInput:');

export type FilterOrganizationInput = ZodArgs.Of<typeof FilterOrganizationSchema>;
