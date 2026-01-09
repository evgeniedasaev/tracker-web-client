'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@libs/api';

export type SignupState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

type SignupResponce = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  code?: string;
  message?: string;
  details?: string[];
};

export async function signupAction(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  let responceData: SignupResponce;
  try {
    responceData = await api<SignupResponce>('/v2/auth/signup', {
      method: 'POST',
      bodyJson: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
      isPublic: true,
    });
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Ошибка регистрации' } as SignupState;
  }

  const { success, accessToken, refreshToken, sessionId, code, message, details } = responceData;

  if (success) {
    const cookieStore = await cookies();
    accessToken &&
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60,
      });
    refreshToken &&
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60,
      });
    sessionId &&
      cookieStore.set('sessionId', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60,
      });

    redirect('/');
  }

  // todo: group api errors by fields
  const apiFieldErrors = {
    email: details?.join(','),
    password: details?.join(','),
  };

  return {
    success: false,
    message: message || 'Registration failed',
    fieldErrors: apiFieldErrors,
  } as SignupState;
}
