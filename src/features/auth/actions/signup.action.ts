import { createAuthAction } from '@/features/auth/model/use-cases';
import type { AuthState } from '@/features/auth/model/view-model';
import type { AuthCredentials } from '@/features/auth/model/types';
import { buildStateFromValidation } from '@/shared/model/view-model';
import { validateCredentials } from '@/features/auth/actions/validate';
import { getAuthService, getSessionService } from '@/features/auth/service/registry';

export type SignupState = AuthState;

const signup = createAuthAction({
  authServiceMethod: getAuthService().signup,
  sessionService: getSessionService(),
  defaultErrorMessage: 'Registration failed',
});

export async function signupAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  'use server';
  const parsed = validateCredentials(formData);
  if (!parsed.success) return buildStateFromValidation<AuthCredentials>(parsed.error);

  return signup(parsed.data);
}
