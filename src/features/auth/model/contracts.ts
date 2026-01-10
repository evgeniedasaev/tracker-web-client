import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .pipe(z.email({ message: 'Email format is invalid' }));

export const credentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, { message: 'At least 8 characters' }),
});

export const authSuccessSchema = z.object({
  success: z.boolean().optional(),
  accessToken: z.string(),
  message: z.string().optional(),
});

export const authErrorSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
  details: z.record(z.array(z.string())).optional(),
});

export const authResponseSchema = z.union([authSuccessSchema, authErrorSchema]);

export type Credentials = z.infer<typeof credentialsSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type AuthFieldErrors = Record<string, string[]>;
