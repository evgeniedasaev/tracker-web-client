import { apiRequest } from '@/shared/api/client';
import {
  AuthResponse,
  authResponseSchema,
  Credentials,
  AuthFieldErrors,
} from '@/features/auth/model/contracts';
import { AuthService, AuthServiceResult } from '@/features/auth/model/service';

const mapResponse = (response: { ok: boolean; data: AuthResponse | null; error?: string }) => {
  if (response.ok && response.data && 'accessToken' in response.data) {
    return { ok: true, accessToken: response.data.accessToken } satisfies AuthServiceResult;
  }

  const details =
    response.data && 'details' in response.data
      ? (response.data.details as AuthFieldErrors | undefined)
      : undefined;
  return {
    ok: false,
    message: response.data?.message || response.error,
    fieldErrors: details,
  } satisfies AuthServiceResult;
};

export const restAuthService: AuthService = {
  async login(credentials: Credentials) {
    const response = await apiRequest<AuthResponse>({
      path: '/v2/auth/login',
      method: 'POST',
      body: credentials,
      schema: authResponseSchema,
    });

    return mapResponse(response);
  },

  async signup(credentials: Credentials) {
    const response = await apiRequest<AuthResponse>({
      path: '/v2/auth/signup',
      method: 'POST',
      body: credentials,
      schema: authResponseSchema,
    });

    return mapResponse(response);
  },
};
