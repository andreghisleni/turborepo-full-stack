import { CheckPoliciesApp } from '@/shared/casl/policies.types';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { CreateOrganizationInput, CreateOrganizationSchema } from './dto/create-organization.input';
import { UpdateOrganizationInput, UpdateOrganizationSchema } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';
import { OrganizationsService } from './organizations.service';

@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) { } // eslint-disable-line

  @CheckPoliciesApp(a => a.can('create', 'Organization'))
  @Mutation(() => Organization)
  async createOrganization(
    @ZodArgs(CreateOrganizationSchema, 'input', {
      name: 'CreateOrganizationInput',
      description: 'Create a new organization',
    })
    input: CreateOrganizationInput,
  ) {
    return this.organizationsService.create(input);
  }

  @CheckPoliciesApp(a => a.can('get', 'Organization'))
  @Query(() => [Organization], { name: 'organizations' })
  findAll() {
    return this.organizationsService.findAll();
  }

  @CheckPoliciesApp(a => a.can('get', 'Organization'))
  @Query(() => Organization, { name: 'organization' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.organizationsService.findById(id);
  }

  @CheckPoliciesApp(a => a.can('get', 'Organization'))
  @Query(() => Organization, { name: 'organizationBySlug' })
  findBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.organizationsService.findBySlug(slug);
  }

  @CheckPoliciesApp(a => a.can('update', 'Organization'))
  @Mutation(() => Organization)
  updateProfile(
    @ZodArgs(UpdateOrganizationSchema, 'input', {
      name: 'CreateOrganizationInput',
      description: 'Create a new organization',
    })
    input: UpdateOrganizationInput,
  ) {
    return this.organizationsService.update(input);
  }

  @CheckPoliciesApp(a => a.can('get', 'Organization'))
  @Query(() => Number)
  getTotalOrganizations() {
    return this.organizationsService.findTotalOrganizations();
  }

  @ResolveField()
  owner(@Parent() { id }: Organization) {
    return this.organizationsService.owner(id);
  }

  // TODO: Add members field
  // TODO: Add invites field
}
