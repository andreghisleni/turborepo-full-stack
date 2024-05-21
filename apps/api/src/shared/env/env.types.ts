import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.number().default(3333),

  API_URL: z.string(),
  WEB_URL: z.string(),

  DATABASE_URL: z.string(),

  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY: z.string(),
  CLOUDFLARE_SECRET_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),

  JWT_SECRET: z.string(),

  THROTTLE_TTL: z.coerce.number(),
  THROTTLE_LIMIT: z.coerce.number(),

  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export type ConfigTypedService = ConfigService<Env, true>;
