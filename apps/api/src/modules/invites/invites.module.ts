import { MailModule } from '@/shared/mail/mail.module';
import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { InvitesResolver } from './invites.resolver';
import { InvitesService } from './invites.service';

@Module({
  providers: [InvitesResolver, InvitesService],
  imports: [MailModule, UsersModule],
  exports: [InvitesService],
})
export class InvitesModule {}
