import { redirect } from 'next/navigation';
import type { AuthState } from '@/features/auth/model/view-model';
import type { AuthService, SessionService } from '@/features/auth/model/service.interface';
import { mapErrorServiceResultToState } from '@/shared/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';

type UseCaseConfig = {
  authServiceMethod: AuthService['login'] | AuthService['signup'];
  sessionService: SessionService;
  defaultErrorMessage?: string;
};

export function createAuthAction({
  authServiceMethod,
  sessionService,
  defaultErrorMessage,
}: UseCaseConfig) {
  return async function authAction(credentials: AuthCredentials): Promise<AuthState> {
    const result = await authServiceMethod(credentials);

    if (result.ok) {
      await sessionService.setAccessToken(result.accessToken);
      redirect('/workouts');
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}
