'use client';

import { AuthState, createAuthAction } from './auth';

export type LoginState = AuthState;

export const loginAction = createAuthAction({
  endpoint: '/v2/auth/login',
  defaultErrorMessage: 'Login failed',
});
