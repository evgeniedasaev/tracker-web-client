import { accessTokenStore } from '@libs/auth/access-token.store';
import { refreshApiFetch } from '@libs/fetch/refresh.api-fetch';

type ApiFetchOptions = RequestInit & { skipRefresh?: boolean };

async function handleRequest<T>(res): Promise<T> {
  const contentType = res.headers.get('content-type') ?? '';
  const bodyText = await res.text();

  if (!bodyText) return undefined as unknown as T;
  if (!contentType.includes('application/json')) return bodyText as T;

  try {
    return { success: res.ok, ...JSON.parse(bodyText) } as T;
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
}

export async function authApiFetch<T>(path: string, init: ApiFetchOptions = {}): Promise<T> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) throw new Error('NEXT_PUBLIC_API_URL is not set');

  const accessToken = accessTokenStore.get();
  if (!accessToken) throw new Error('No auth token for non public method');

  const { skipRefresh = false, ...requestInit } = init;
  const apiUrl = `${api}${path}`;
  const requestHeaders = new Headers(requestInit?.headers);
  requestHeaders.set('Authorization', `Bearer ${accessToken}`);

  const res = await fetch(apiUrl, {
    ...requestInit,
    headers: requestHeaders,
  });

  if (res.status !== 401 || skipRefresh) return handleRequest<T>(res);

  const newAccessToken = await refreshApiFetch();
  if (!newAccessToken) throw new Error('No auth token for non public method');

  requestHeaders.set('Authorization', `Bearer ${newAccessToken}`);

  const newRes = await fetch(apiUrl, {
    ...requestInit,
    headers: requestHeaders,
  });

  return handleRequest<T>(newRes);
}
