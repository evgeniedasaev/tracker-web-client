import { createLoginAction } from '@/features/auth/model/use-cases';
import type { AuthState } from '@/features/auth/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';
import { buildStateFromValidation } from '@/shared/model/view-model';
import { validateCredentials } from '@/features/auth/actions/validate';
import { getAuthService, getSessionService } from '@/features/auth/service/registry';
import { redirect } from 'next/navigation';

export type LoginState = AuthState;

const login = createLoginAction({
  authService: getAuthService(),
  sessionService: getSessionService(),
  defaultErrorMessage: 'Login failed',
});

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  'use server';
  const parsed = validateCredentials(formData);
  if (!parsed.success) return buildStateFromValidation<AuthCredentials>(parsed.error);

  const result = await login(parsed.data);

  if (result.success) redirect('/workouts');

  return result;
}
