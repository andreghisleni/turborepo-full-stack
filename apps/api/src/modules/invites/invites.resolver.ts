import { CurrentSession } from '@/shared/auth/auth.guard';
import { CheckPoliciesApp, CheckPoliciesOrg } from '@/shared/casl/policies.types';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { Session } from '../sessions/entities/session.entity';
import { CreateInviteInput, CreateInviteSchema } from './dto/create-invite.input';
import { Invite } from './entities/invite.entity';
import { InvitesService } from './invites.service';

@Resolver(() => Invite)
export class InvitesResolver {
  constructor(private readonly invitesService: InvitesService) { } // eslint-disable-line

  @CheckPoliciesOrg(a => a.can('create', 'Invite'))
  @Mutation(() => Invite)
  async createInvite(
    @ZodArgs(CreateInviteSchema, 'input', {
      name: 'CreateInviteInput',
      description: 'Create a new invite',
    })
    input: CreateInviteInput,
    @CurrentSession() { user, member }: Session,
  ) {
    return this.invitesService.create(input, (member as any).organization.id, user.id);
  }

  @CheckPoliciesApp(a => a.can('get', 'Invite'))
  @Query(() => Invite, { name: 'invite' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.invitesService.findById(id);
  }

  @ResolveField()
  organization(@Parent() invite: Invite) {
    return this.invitesService.organization(invite.id);
  }

  @ResolveField()
  author(@Parent() invite: Invite) {
    return this.invitesService.author(invite.id);
  }

  @CheckPoliciesApp(a => a.can('accept', 'Invite'))
  @Mutation(() => Invite)
  acceptInvite(
    @Args('id', { type: () => String }) id: string,
    @CurrentSession() { user }: Session,
  ) {
    return this.invitesService.acceptInvite(id, user.id);
  }

  @CheckPoliciesApp(a => a.can('reject', 'Invite'))
  @Mutation(() => Invite)
  rejectInvite(@Args('id', { type: () => String }) id: string) {
    return this.invitesService.rejectInvite(id);
  }
}
