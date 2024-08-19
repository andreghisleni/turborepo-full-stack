import { Session } from '@/modules/sessions/entities/session.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { CheckPoliciesApp } from '../casl/policies.types';
import { CurrentSession } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthType } from './dto/auth.type';
import { CreateAuthInput, CreateAuthSchema } from './dto/create-auth.input';
import { Public } from './public.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { } //eslint-disable-line

  @Public()
  @Mutation(() => AuthType)
  createSession(@ZodArgs(CreateAuthSchema, 'data') data: CreateAuthInput) {
    return this.authService.validateUser(data);
  }

  @Public()
  @Mutation(() => AuthType)
  refreshSession(@Args('refreshToken', { type: () => String }) refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @CheckPoliciesApp(a => a.can('get', 'Session'))
  @Query(() => Session)
  session(@CurrentSession() session: Session) {
    return session;
  }

  @CheckPoliciesApp(a => a.can('update', 'Session'))
  @Mutation(() => Session)
  updateSession(
    @Args('slug', { type: () => String }) slug: string,
    @CurrentSession() session: Session,
  ) {
    return this.authService.validateOrganization(session, slug);
  }
}
