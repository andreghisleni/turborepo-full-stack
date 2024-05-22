import { CurrentSession } from '@/shared/auth/auth.guard';
import { Public } from '@/shared/auth/public.decorator';
import { CheckPoliciesApp } from '@/shared/casl/policies.types';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { Session } from '../sessions/entities/session.entity';
import { CreateUserInput, CreateUserSchema } from './dto/create-user.input';
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
      description: 'Create a new inventory_item',
    })
    input: CreateUserInput,
  ) {
    return this.usersService.create(input);
  }

  @CheckPoliciesApp(a => a.can('get', 'User'))
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
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
      description: 'Create a new inventory_item',
    })
    input: UpdateUserInput,
    @CurrentSession() { user }: Session,
  ) {
    return this.usersService.update(user.id, input);
  }
  @CheckPoliciesApp(a => a.can('update', 'User'))
  @Mutation(() => User)
  updateAvatar(@Args('avatar', { type: () => String }) avatar: string, @CurrentSession() { user }: Session) {
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

  @CheckPoliciesApp(a => a.can('get', 'User'))
  @Query(() => Number)
  getTotalUsers() {
    return this.usersService.findTotalUsers();
  }
}
