import { redirect } from 'next/navigation';
import { setAccessToken } from '@/shared/api/token';
import type { AuthState } from '@/features/auth/model/view-model';
import { getAuthService } from '@/features/auth/model/service-registry';
import { mapErrorServiceResultToState } from '@/shared/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';

type UseCaseConfig = {
  action: 'login' | 'signup';
  defaultErrorMessage: string;
};

export function createAuthAction({ action, defaultErrorMessage }: UseCaseConfig) {
  return async function authAction(credentials: AuthCredentials): Promise<AuthState> {
    const authService = getAuthService();
    const result = await authService[action](credentials);

    if (result.ok) {
      await setAccessToken(result.accessToken);
      redirect('/workouts');
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}
