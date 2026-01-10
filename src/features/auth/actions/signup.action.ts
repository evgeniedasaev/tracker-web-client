import { createAuthAction } from '@/features/auth/model/use-cases';
import type { AuthState } from '@/features/auth/model/view-model';

export type SignupState = AuthState;

const signup = createAuthAction({
  action: 'signup',
  defaultErrorMessage: 'Registration failed',
});

export async function signupAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  'use server';
  return signup(prevState, formData);
}
