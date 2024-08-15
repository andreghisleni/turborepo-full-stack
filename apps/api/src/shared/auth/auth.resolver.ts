import { Session } from '@/modules/sessions/entities/session.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

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

  @Query(() => Session)
  session(@CurrentSession() session: Session) {
    return session;
  }

  @Mutation(() => Session)
  updateSession(
    @Args('memberId', { type: () => String }) memberId: string,
    @CurrentSession() session: Session,
  ) {
    return this.authService.validateOrganization(session, memberId);
  }
}
