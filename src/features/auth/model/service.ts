import { ServiceResult } from '@/shared/lib/view-model.helpers';
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
