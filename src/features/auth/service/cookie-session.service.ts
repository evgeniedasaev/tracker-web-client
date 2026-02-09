import { setAccessToken } from '@/shared/token/cookie/token';
import type { SessionService } from '@/features/auth/model/service.interface';

export const sessionService: SessionService = {
  async setAccessToken(accessToken: string) {
    await setAccessToken(accessToken);
  },
};
