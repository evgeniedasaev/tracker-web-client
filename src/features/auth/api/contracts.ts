import { z } from 'zod';
import { apiErrorSchema } from '@/shared/api/contracts';
import type { AuthCredentials } from '@/features/auth/model/types';

const emailSchema = z
  .string()
  .trim()
  .pipe(z.email({ message: 'Email format is invalid' }));

export const credentialsSchema: z.ZodType<AuthCredentials> = z.object({
  email: emailSchema,
  password: z.string().min(8, { message: 'At least 8 characters' }),
});

export const authSuccessSchema = z.object({
  success: z.boolean().optional(),
  accessToken: z.string(),
  message: z.string().optional(),
});

export const authResponseSchema = z.union([authSuccessSchema, apiErrorSchema]);

export type AuthResponse = z.infer<typeof authResponseSchema>;
export type AuthFieldErrors = Record<string, string[]>;
