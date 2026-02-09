import { getSessionService } from '@/features/auth/service/registry';

export async function isAuthenticatedQuery(): Promise<boolean> {
  const sessionService = getSessionService();
  return sessionService.isAuthenticated();
}
