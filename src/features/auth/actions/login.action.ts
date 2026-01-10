import { createAuthAction } from '@/features/auth/model/use-cases';
import type { AuthState } from '@/features/auth/model/view-model';

export type LoginState = AuthState;

const login = createAuthAction({
  action: 'login',
  defaultErrorMessage: 'Login failed',
});

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  'use server';
  return login(prevState, formData);
}
