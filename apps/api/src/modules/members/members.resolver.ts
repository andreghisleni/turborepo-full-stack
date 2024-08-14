import { CheckPoliciesOrg } from '@/shared/casl/policies.types';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { FilterMemberInput, FilterMemberSchema } from './dto/filter-input';
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
  ) {
    return this.membersService.findAll(filter);
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
  ) {
    return this.membersService.findTotalMembers(filter);
  }

  @CheckPoliciesOrg(a => a.can('get', 'Member'))
  @Query(() => Member, { name: 'member' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.membersService.findById(id);
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
