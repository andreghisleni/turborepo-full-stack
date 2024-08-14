import { CurrentSession } from '@/shared/auth/auth.guard';
import { Public } from '@/shared/auth/public.decorator';
import { CheckPoliciesApp } from '@/shared/casl/policies.types';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { Session } from '../sessions/entities/session.entity';
import { CreateUserInput, CreateUserSchema } from './dto/create-user.input';
import { FilterUserInput, FilterUserSchema } from './dto/filter-input';
import { ResetPasswordInput, ResetPasswordSchema } from './dto/reset-password.input';
import { UpdateRoleInput, UpdateRoleSchema } from './dto/update-role.input';
import { UpdateUserInput, UpdateUserSchema } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { } // eslint-disable-line

  @Public()
  @Mutation(() => User)
  async createUser(
    @ZodArgs(CreateUserSchema, 'input', {
      name: 'CreateUserInput',
      description: 'Create a new user',
    })
    input: CreateUserInput,
  ) {
    return this.usersService.create(input);
  }

  @CheckPoliciesApp(a => a.can('get', 'User'))
  @Query(() => [User], { name: 'users' })
  findAll(
    @ZodArgs(FilterUserSchema, 'filter', {
      name: 'FilterUserInput',
      description: 'Filtered a new client',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterUserInput,
  ) {
    return this.usersService.findAll(filter);
  }

  @CheckPoliciesApp(a => a.can('get', 'User'))
  @Query(() => Number)
  getTotalUsers(
    @ZodArgs(FilterUserSchema, 'filter', {
      name: 'FilterUserInput',
      description: 'Filtered a new client',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterUserInput,
  ) {
    return this.usersService.findTotalUsers(filter);
  }

  @CheckPoliciesApp(a => a.can('get', 'User'))
  @Query(() => User, { name: 'user' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @CheckPoliciesApp(a => a.can('update', 'User'))
  @Mutation(() => User)
  updateProfile(
    @ZodArgs(UpdateUserSchema, 'input', {
      name: 'CreateUserInput',
      description: 'Create a new user',
    })
    input: UpdateUserInput,
    @CurrentSession() { user }: Session,
  ) {
    return this.usersService.update(user.id, input);
  }

  @CheckPoliciesApp(a => a.can('update', 'User'))
  @Mutation(() => User)
  updateAvatar(
    @Args('avatar', { type: () => String }) avatar: string,
    @CurrentSession() { user }: Session,
  ) {
    return this.usersService.updateAvatar(user.id, avatar);
  }

  @CheckPoliciesApp(a => a.can('activate', 'User'))
  @Mutation(() => User)
  activateUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.activate(id);
  }

  @CheckPoliciesApp(a => a.can('block', 'User'))
  @Mutation(() => User)
  blockUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.block(id);
  }

  // @Mutation(() => User)
  // linkUserToPermissionGroup(
  //   @Args('userId', { type: () => String }) userId: string,
  //   @Args('permission_groupId', { type: () => String })
  //   permission_groupId: string,
  // ) {
  //   return this.usersService.linkPermissionGroup(userId, permission_groupId);
  // }

  @CheckPoliciesApp(a => a.can('get', 'User'))
  @Query(() => User)
  profile(@CurrentSession() { user }: Session) {
    return user;
  }

  @Public()
  @Mutation(() => Boolean)
  async sendForgotPasswordEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.sendForgotPasswordEmail(email);
  }

  @Public()
  @Mutation(() => Boolean)
  async resetPassword(
    @ZodArgs(ResetPasswordSchema, 'input', {
      name: 'ResetPasswordInput',
      description: 'Reset user password',
    })
    input: ResetPasswordInput,
  ) {
    return this.usersService.resetPassword(input);
  }

  @CheckPoliciesApp(a => a.can('update-role', 'User'))
  @Mutation(() => User)
  updateRole(
    @ZodArgs(UpdateRoleSchema, 'input', {
      name: 'UpdateRoleInput',
      description: 'Update user role',
    })
    input: UpdateRoleInput,
  ) {
    return this.usersService.updateRole(input);
  }

  @ResolveField()
  owns_organizations(@Parent() { id }: User) {
    return this.usersService.owns_organizations(id);
  }

  @ResolveField()
  sessions(@Parent() { id }: User) {
    return this.usersService.sessions(id);
  }

  @ResolveField()
  invites(@Parent() { id }: User) {
    return this.usersService.invites(id);
  }

  @ResolveField()
  member_on(@Parent() { id }: User) {
    return this.usersService.member_on(id);
  }
}
