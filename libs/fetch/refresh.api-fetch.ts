import { accessTokenStore } from '@libs/auth/access-token.store';

export async function refreshApiFetch(init: RequestInit = {}): Promise<string | null> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) throw new Error('NEXT_PUBLIC_API_URL is not set');

  const res = await fetch(`${api}/v2/auth/refresh`, {
    ...init,
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { accessToken: string };
  accessTokenStore.set(data.accessToken);
  return data.accessToken;
}
