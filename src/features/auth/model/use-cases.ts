import { redirect } from 'next/navigation';
import type { AuthState } from '@/features/auth/model/view-model';
import type { AuthService, SessionService } from '@/features/auth/model/service.interface';
import { mapErrorServiceResultToState } from '@/shared/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';

type UseCaseConfig = {
  authService: AuthService;
  sessionService: SessionService;
  defaultErrorMessage?: string;
};

export function createLoginAction({
  authService,
  sessionService,
  defaultErrorMessage,
}: UseCaseConfig) {
  return async function loginAction(credentials: AuthCredentials): Promise<AuthState> {
    const result = await authService.login(credentials);

    if (result.ok) {
      await sessionService.setAccessToken(result.accessToken);
      return { success: true };
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}

export function createSignUpAction({
  authService,
  sessionService,
  defaultErrorMessage,
}: UseCaseConfig) {
  return async function signUpAction(credentials: AuthCredentials): Promise<AuthState> {
    const result = await authService.signup(credentials);

    if (result.ok) {
      await sessionService.setAccessToken(result.accessToken);
      return { success: true };
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}
