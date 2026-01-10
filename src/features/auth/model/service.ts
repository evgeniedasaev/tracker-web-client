import { Credentials, credentialsSchema, AuthFieldErrors } from '@/features/auth/model/contracts';

export type AuthServiceResult =
  | { ok: true; accessToken: string }
  | { ok: false; message?: string; fieldErrors?: AuthFieldErrors };

export type AuthService = {
  login(credentials: Credentials): Promise<AuthServiceResult>;
  signup(credentials: Credentials): Promise<AuthServiceResult>;
};

export const validateCredentials = (formData: FormData) =>
  credentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
