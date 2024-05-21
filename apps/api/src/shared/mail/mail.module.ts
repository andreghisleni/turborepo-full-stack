import { SesModule } from '@agsolutions/nestjs-ses';
import { Module } from '@nestjs/common';

import { EnvService } from '../env/env.service';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [
    SesModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => {
        return {
          apiKey: env.get('AWS_ACCESS_KEY_ID'),
          secret: env.get('AWS_SECRET_ACCESS_KEY'),
          region: 'us-east-2',
        };
      },
    }),
  ],
})
export class MailModule {}
