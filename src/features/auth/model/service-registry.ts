import { config } from '@/shared/config/config';
import type { AuthService } from '@/features/auth/model/service';
import { restAuthService } from '@/features/auth/api/rest-auth.service';

const registry: Record<string, AuthService> = {
  rest: restAuthService,
};

export const getAuthService = (): AuthService => registry[config.authTransport] ?? restAuthService;
