import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'node:path';

import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './shared/auth/auth.module';
import { CaslModule } from './shared/casl/casl.module';
import { CloudFlareModule } from './shared/cloud-flare-r2/cloud-flare-r2.module';
import { PrismaModule } from './shared/database/prisma.module';
import { EnvModule } from './shared/env/env.module';
import { EnvService } from './shared/env/env.service';
import { envSchema } from './shared/env/env.types';
import { FileModule } from './shared/file/file.module';
import { MailModule } from './shared/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: config => {
        return envSchema.parse(config);
      },
    }),
    EnvModule,
    ThrottlerModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => {
        return [
          {
            ttl: env.get('THROTTLE_TTL'),
            limit: env.get('THROTTLE_LIMIT'),
          },
        ];
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // formatError: error => {
      //   return {
      //     ...error,
      //     extensions: {
      //       ...error.extensions,
      //       stacktrace: error?.extensions?.stacktrace?.[0],
      //     },
      //   };
      // },
      context: ({ req }) => ({ req }),
      playground: false,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true,
              graphRef: 'andregr',
            })
          : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    }),
    CloudFlareModule,
    PrismaModule,
    MailModule,
    UsersModule,
    AuthModule,
    CaslModule,

    OrganizationsModule,

    // Other modules

    FileModule,
  ],
  providers: [],
})
export class AppModule {}
