import { CurrentSession } from '@/shared/auth/auth.guard';
import { CheckPoliciesOrg } from '@/shared/casl/policies.types';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { Session } from '../sessions/entities/session.entity';
import { FilterMemberInput, FilterMemberSchema } from './dto/filter-input';
import { UpdateMemberRoleInput, UpdateMemberRoleSchema } from './dto/update-role.input';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) { } // eslint-disable-line

  @CheckPoliciesOrg(a => a.can('get', 'Member'))
  @Query(() => [Member], { name: 'members' })
  findAll(
    @ZodArgs(FilterMemberSchema, 'filter', {
      name: 'FilterMemberInput',
      description: 'Filtered a new client',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterMemberInput,
    @CurrentSession() { organization }: Session,
  ) {
    return this.membersService.findAll(filter, organization.id);
  }

  @CheckPoliciesOrg(a => a.can('get', 'Member'))
  @Query(() => Number)
  getTotalMembers(
    @ZodArgs(FilterMemberSchema, 'filter', {
      name: 'FilterMemberInput',
      description: 'Filtered a new client',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterMemberInput,
    @CurrentSession() { organization }: Session,
  ) {
    return this.membersService.findTotalMembers(filter, organization.id);
  }

  @CheckPoliciesOrg(a => a.can('get', 'Member'))
  @Query(() => Member, { name: 'member' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.membersService.findById(id);
  }

  @CheckPoliciesOrg(a => a.can('update-role', 'Member'))
  @Mutation(() => Member)
  updateMemberRole(
    @ZodArgs(UpdateMemberRoleSchema, 'input', {
      name: 'UpdateMemberRoleInput',
      description: 'Update user role',
    })
    input: UpdateMemberRoleInput,
    @CurrentSession() { user }: Session,
  ) {
    return this.membersService.updateRole(input, user.id);
  }

  @ResolveField()
  user(@Parent() { id }: Member) {
    return this.membersService.user(id);
  }

  @ResolveField()
  organization(@Parent() { id }: Member) {
    return this.membersService.organization(id);
  }
}
