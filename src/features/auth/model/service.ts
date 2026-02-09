import { ServiceResult } from '@/shared/model/view-model';
import { Credentials, credentialsSchema } from '@/features/auth/model/contracts';

export type AuthServiceResult = ServiceResult<{ accessToken: string }>;

export type AuthService = {
  login(credentials: Credentials): Promise<AuthServiceResult>;
  signup(credentials: Credentials): Promise<AuthServiceResult>;
};

export const validateCredentials = (formData: FormData) =>
  credentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
