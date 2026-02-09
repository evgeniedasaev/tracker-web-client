import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  AUTH_TRANSPORT: z.enum(['rest']).default('rest'),
  SESSION_TRANSPORT: z.enum(['cookie']).default('cookie'),
  WORKOUTS_TRANSPORT: z.enum(['rest']).default('rest'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const parsed = configSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  AUTH_TRANSPORT: process.env.AUTH_TRANSPORT,
  SESSION_TRANSPORT: process.env.SESSION_TRANSPORT,
  WORKOUTS_TRANSPORT: process.env.WORKOUTS_TRANSPORT,
  LOG_LEVEL: process.env.LOG_LEVEL ?? process.env.NEXT_PUBLIC_LOG_LEVEL,
});

export const config = {
  apiBaseUrl: parsed.NEXT_PUBLIC_API_URL,
  authTransport: parsed.AUTH_TRANSPORT,
  sessionTransport: parsed.SESSION_TRANSPORT,
  workoutsTransport: parsed.WORKOUTS_TRANSPORT,
  logLevel: parsed.LOG_LEVEL,
};
