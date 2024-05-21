import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvService } from './env.service';

@Global()
@Module({
  providers: [EnvService],
  exports: [EnvService],
  imports: [ConfigModule],
})
export class EnvModule {}
