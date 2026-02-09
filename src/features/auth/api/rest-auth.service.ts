import { apiRequest } from '@/shared/api/client';
import { AuthResponse, authResponseSchema } from '@/features/auth/api/contracts';
import { AuthService, AuthServiceResult } from '@/features/auth/model/service';
import type { AuthCredentials } from '@/features/auth/model/types';
import { mapUnknownResponseErrors } from '@/shared/api/map-error-response';

const mapResponse = (response: { ok: boolean; data: AuthResponse | null; error?: string }) => {
  if (response.ok && response.data && 'accessToken' in response.data) {
    return { ok: true, accessToken: response.data.accessToken } satisfies AuthServiceResult;
  }

  return mapUnknownResponseErrors(response) satisfies AuthServiceResult;
};

export const restAuthService: AuthService = {
  async login(credentials: AuthCredentials) {
    const response = await apiRequest<AuthResponse>({
      path: '/v2/auth/login',
      method: 'POST',
      body: credentials,
      schema: authResponseSchema,
    });

    return mapResponse(response);
  },

  async signup(credentials: AuthCredentials) {
    const response = await apiRequest<AuthResponse>({
      path: '/v2/auth/signup',
      method: 'POST',
      body: credentials,
      schema: authResponseSchema,
    });

    return mapResponse(response);
  },
};
