export async function publicApiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) throw new Error('NEXT_PUBLIC_API_URL is not set');

  let res;
  try {
    res = await fetch(`${api}${path}`, {
      ...init,
    });
  } catch (error) {
    throw new Error('Failed to fetch endpoit');
  }
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
