import { SessionsModule } from '@/modules/sessions/sessions.module';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { EnvService } from '../env/env.service';
import { JWTAuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    SessionsModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        secret: env.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
