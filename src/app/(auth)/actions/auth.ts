import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { api } from '@libs/api';

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: 'Email format is invalid' }),
  password: z.string().min(8, { message: 'At least 8 characters' }),
});

type FieldErrors = Record<string, string>;

export type AuthState = {
  success: boolean;
  message?: string;
  fieldErrors?: FieldErrors;
};

type AuthResponse = {
  success?: boolean;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  code?: string;
  message?: string;
  details?: Record<string, string[]>;
};

type AuthActionConfig = {
  endpoint: string;
  defaultErrorMessage: string;
};

const buildFieldErrors = (errors: Record<string, string[]> = {}): FieldErrors =>
  Object.fromEntries(
    Object.entries(errors)
      .filter(([, messages]) => messages?.length)
      .map(([key, messages]) => [key, messages![0]]),
  );

const buildApiFieldErrors = (details: Record<string, string[]> = {}): FieldErrors =>
  Object.fromEntries(
    Object.entries(details).map(([field, messages]) => [field, messages?.join(', ') ?? '']),
  );

async function setAuthCookies(
  tokens: Pick<AuthResponse, 'accessToken' | 'refreshToken' | 'sessionId'>,
) {
  const { accessToken, refreshToken, sessionId } = tokens;
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
}

export function createAuthAction({ endpoint, defaultErrorMessage }: AuthActionConfig) {
  return async function authAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const parsed = credentialsSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsed.success) {
      return {
        success: false,
        message: 'Fix validation errors',
        fieldErrors: buildFieldErrors(parsed.error.flatten().fieldErrors),
      };
    }

    const { email, password } = parsed.data;
    let responseData: AuthResponse = {};

    try {
      responseData = await api<AuthResponse>(endpoint, {
        method: 'POST',
        bodyJson: { email, password },
        isPublic: true,
      });
    } catch (error) {
      console.log(error);
      return { success: false, message: defaultErrorMessage };
    }

    const {
      success = false,
      accessToken,
      refreshToken,
      sessionId,
      message,
      details = {},
    } = responseData;

    if (success) {
      await setAuthCookies({ accessToken, refreshToken, sessionId });
      redirect('/');
    }

    return {
      success: false,
      message: message || defaultErrorMessage,
      fieldErrors: buildApiFieldErrors(details),
    };
  };
}
