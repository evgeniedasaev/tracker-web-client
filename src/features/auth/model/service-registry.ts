import { config } from '@/shared/config/config';
import type { AuthService } from '@/features/auth/model/service';
import { restAuthService } from '@/features/auth/api/rest-auth.service';
import { createServiceRegistry } from '@/shared/lib/service-registry';

const registry: Record<string, AuthService> = {
  rest: restAuthService,
};

export const getAuthService = createServiceRegistry<AuthService>(config.authTransport, registry);
