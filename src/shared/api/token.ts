import { cookies } from 'next/headers';
import { config } from '@/shared/config/config';
import { logger } from '@/shared/lib/logger';

const ACCESS_TOKEN_COOKIE = 'accessToken';

const buildCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
});

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(ACCESS_TOKEN_COOKIE);
  return tokenCookie ? tokenCookie.value : null;
}

export async function setAccessToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE, token, buildCookieOptions());
}

export async function clearAccessToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
}

export async function refreshAccessToken(): Promise<string | null> {
  const res = await fetch(`${config.apiBaseUrl}/v2/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    logger.warn('Refresh token failed', { status: res.status });
    await clearAccessToken();
    return null;
  }

  const data = (await res.json()) as { accessToken?: string };
  if (data.accessToken) {
    await setAccessToken(data.accessToken);
    return data.accessToken;
  }

  return null;
}
