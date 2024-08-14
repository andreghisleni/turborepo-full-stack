import { Module } from '@nestjs/common';

import { MembersResolver } from './members.resolver';
import { MembersService } from './members.service';

@Module({
  providers: [MembersResolver, MembersService],
  imports: [],
  exports: [MembersService],
})
export class MembersModule {}
