import type { ServiceResult } from '@/shared/model/view-model';
import type { AuthCredentials, AuthSession } from '@/features/auth/model/types';

export type AuthServiceResult = ServiceResult<AuthSession>;

export type AuthService = {
  login(credentials: AuthCredentials): Promise<AuthServiceResult>;
  signup(credentials: AuthCredentials): Promise<AuthServiceResult>;
};

export type SessionService = {
  setAccessToken(accessToken: string): Promise<void>;
  isAuthenticated(): Promise<boolean>;
};
