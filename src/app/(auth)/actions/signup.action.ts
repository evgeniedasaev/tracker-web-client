'use client';

import { AuthState, createAuthAction } from './auth';

export type SignupState = AuthState;

export const signupAction = createAuthAction({
  endpoint: '/v2/auth/signup',
  defaultErrorMessage: 'Registration failed',
});
