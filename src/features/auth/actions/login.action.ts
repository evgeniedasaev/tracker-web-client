import { createLoginUseCase } from '@/features/auth/model/use-cases';
import type { AuthState } from '@/features/auth/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';
import { buildStateFromValidation } from '@/shared/model/view-model';
import { validateCredentials } from '@/features/auth/actions/validate';
import { getAuthService, getSessionService } from '@/features/auth/service/registry';
import { redirect } from 'next/navigation';
import { TOAST_KEYS } from '@/shared/ui/toast';

export type LoginState = AuthState;

const loginUseCase = createLoginUseCase({
  authService: getAuthService(),
  sessionService: getSessionService(),
  defaultErrorMessage: 'Login failed',
});

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  'use server';
  const parsed = validateCredentials(formData);
  if (!parsed.success) return buildStateFromValidation<AuthCredentials>(parsed.error);

  const result = await loginUseCase(parsed.data);

  if (result.success) redirect(`/workouts?toast=${TOAST_KEYS.auth_login_success}`);

  return result;
}
