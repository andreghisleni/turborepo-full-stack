import { MailModule } from '@/shared/mail/mail.module';
import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';

@Module({
  providers: [OrganizationsResolver, OrganizationsService],
  imports: [MailModule, UsersModule],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
