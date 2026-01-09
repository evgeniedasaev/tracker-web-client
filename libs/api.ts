import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  if (!token && !isPublic) {
    // todo: throw an error handle it outside
    redirect('/');
  }

  const res = await fetch(`${base}${path}`, {
    ...requestInit,
    headers: requestHeaders,
    body: requestInit?.body ? requestInit.body : JSON.stringify(bodyJson),
  });
  const contentType = res.headers.get('content-type') ?? '';
  const bodyText = await res.text();

  if (!bodyText) {
    // todo: throw error handle outside
    return undefined as T;
  }

  if (!contentType.includes('application/json')) {
    // todo: throw error handle outside
    return bodyText as unknown as T;
  }

  try {
    return { success: res.ok, ...JSON.parse(bodyText) } as T;
  } catch (error) {
    // todo: throw error handle outside
    console.log('Failed to parse JSON response', error);
  }

  return undefined as T;
}
