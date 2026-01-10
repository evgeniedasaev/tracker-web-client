import { redirect } from 'next/navigation';
import { z } from 'zod';
import { publicApiFetch } from '@libs/fetch/public.api-fetch';
import { accessTokenStore } from '@libs/auth/access-token.store';

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
      responseData = await publicApiFetch<AuthResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
      });
    } catch (error) {
      console.log('!', error);
      return { success: false, message: defaultErrorMessage };
    }

    const { success = false, accessToken, message, details = {} } = responseData;
    console.log('!', accessTokenStore);
    if (success && accessToken) {
      accessTokenStore.set(accessToken);
      redirect('/');
    }

    return {
      success: false,
      message: message || defaultErrorMessage,
      fieldErrors: buildApiFieldErrors(details),
    };
  };
}
