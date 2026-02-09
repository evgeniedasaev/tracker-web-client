import { getAccessToken, setAccessToken } from '@/shared/auth/cookie/token';
import type { SessionService } from '@/features/auth/model/service.interface';

export const sessionService: SessionService = {
  async setAccessToken(accessToken: string) {
    await setAccessToken(accessToken);
  },
  async isAuthenticated(): Promise<boolean> {
    const token = await getAccessToken();
    return Boolean(token);
  },
};
