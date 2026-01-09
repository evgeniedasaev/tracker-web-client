import { cookies } from 'next/headers';

const base = process.env.NEXT_PUBLIC_API_URL!;

type ApiRequestInit = RequestInit & { isPublic?: boolean; bodyJson?: Record<string, string> };

export async function api<T>(path: string, init: ApiRequestInit = {}): Promise<T> {
  const { isPublic = false, headers, bodyJson = {}, ...requestInit } = init;

  const requestHeaders = new Headers(headers ?? {});
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('Content-Type', 'application/json');

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (token && !isPublic) requestHeaders.set('Authorization', `Bearer ${token}`);

  if (!token && !isPublic) throw new Error('No auth token for non public method');

  const res = await fetch(`${base}${path}`, {
    ...requestInit,
    headers: requestHeaders,
    body: requestInit?.body ? requestInit.body : JSON.stringify(bodyJson),
  });
  const contentType = res.headers.get('content-type') ?? '';
  const bodyText = await res.text();

  if (!bodyText) throw new Error('Responce body is empty');
  if (!contentType.includes('application/json')) throw new Error('Responce is not json');

  try {
    return { success: res.ok, ...JSON.parse(bodyText) } as T;
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
}
