import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const CreateOrganizationObject = {
  name: z.string().min(5).describe('The name of the organization'),
  slug: z.string().min(5).describe('The slug of the organization'),
  domain: z.string().optional().describe('The domain of the organization'),
  shouldAttachUsersByDomain: z.boolean().describe('Whether to attach users by domain'),
  ownerId: z.string().describe('The owner of the organization'),
};

export const CreateOrganizationSchema = z
  .object(CreateOrganizationObject)
  .describe('CreateOrganizationInput:');

export type CreateOrganizationInput = ZodArgs.Of<typeof CreateOrganizationSchema>;
