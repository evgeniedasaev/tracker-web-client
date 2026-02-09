import { config } from '@/shared/config/config';
import { createServiceRegistry } from '@/shared/lib/service-registry';
import type { AuthService } from '@/features/auth/model/service.interface';
import type { SessionService } from '@/features/auth/model/service.interface';
import { restAuthService } from '@/features/auth/service/rest-auth.service';
import { sessionService } from '@/features/auth/service/cookie-session.service';

const authRegistry: Record<string, AuthService> = {
  rest: restAuthService,
};

const sessionRegistry: Record<string, SessionService> = {
  cookie: sessionService,
};

export const getAuthService = createServiceRegistry<AuthService>(
  config.authTransport,
  authRegistry,
);

export const getSessionService = createServiceRegistry<SessionService>(
  config.sessionTransport,
  sessionRegistry,
);
