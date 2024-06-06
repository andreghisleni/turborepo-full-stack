import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const UpdateOrganizationSchema = z
  .object({
    id: z.string().describe('The id of the organization'),
    name: z.string().min(5).optional().describe('The name of the organization'),
  })
  .describe('UpdateOrganizationInput:');

export type UpdateOrganizationInput = ZodArgs.Of<typeof UpdateOrganizationSchema>;
