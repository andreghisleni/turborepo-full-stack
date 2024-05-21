import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { EnvService } from './shared/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // app.use((req, res, next) => {
  //   console.log('req', req.headers);

  //   return next();
  // });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  const env = app.get(EnvService);

  const port = env.get('PORT');

  await app.listen(port);

  const logger = new Logger(AppModule.name);
  logger.log(`🤖 Server is running on ${await app.getUrl()}`);
}
bootstrap();
