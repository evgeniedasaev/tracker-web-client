import { createAuthAction } from '@/features/auth/model/use-cases';
import type { AuthState } from '@/features/auth/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';
import { buildStateFromValidation } from '@/shared/model/view-model';
import { validateCredentials } from '@/features/auth/actions/validate';

export type LoginState = AuthState;

const login = createAuthAction({
  action: 'login',
  defaultErrorMessage: 'Login failed',
});

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  'use server';
  const parsed = validateCredentials(formData);
  if (!parsed.success) return buildStateFromValidation<AuthCredentials>(parsed.error);

  return login(parsed.data);
}
