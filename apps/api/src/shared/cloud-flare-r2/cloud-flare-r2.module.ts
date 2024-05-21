import { Module } from '@nestjs/common';

import { CloudflareR2Service } from './cloud-flare-r2.service';

@Module({
  providers: [CloudflareR2Service],
  imports: [],
  exports: [CloudflareR2Service],
})
export class CloudFlareModule {}
