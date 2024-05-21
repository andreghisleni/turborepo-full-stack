import { Module } from '@nestjs/common';

import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsResolver, SessionsService],
  imports: [],
  exports: [SessionsService],
})
export class SessionsModule {}
