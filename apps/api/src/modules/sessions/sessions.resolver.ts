import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @ResolveField()
  user(@Parent() { id }: Session) {
    return this.sessionsService.user(id);
  }

  @ResolveField()
  member(@Parent() { id }: Session) {
    return this.sessionsService.member(id);
  }
}
