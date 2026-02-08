import { redirect } from 'next/navigation';
import { setAccessToken } from '@/shared/api/token';
import type { AuthState } from '@/features/auth/model/view-model';
import { validateCredentials } from '@/features/auth/model/service';
import { getAuthService } from '@/features/auth/model/service-registry';
import { buildStateFromValidation, mapErrorServiceResultToState } from '@/shared/lib/view-model.helpers';
import type { Credentials } from '@/features/auth/model/contracts';

type UseCaseConfig = {
  action: 'login' | 'signup';
  defaultErrorMessage: string;
};

export function createAuthAction({ action, defaultErrorMessage }: UseCaseConfig) {
  return async function authAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const parsed = validateCredentials(formData);
    if (!parsed.success) return buildStateFromValidation<Credentials>(parsed.error);

    const credentials = parsed.data;
    const authService = getAuthService();
    const result = await authService[action](credentials);

    if (result.ok) {
      await setAccessToken(result.accessToken);
      redirect('/workouts');
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}
