import { z } from 'zod';
import { config } from '@/shared/config/config';
import { getAccessToken, refreshAccessToken, setAccessToken } from '@/shared/api/token';
import { logger } from '@/shared/lib/logger';

type ApiRequestOptions<TSchema> = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: 'public' | 'required';
  schema?: z.ZodType<TSchema>;
};

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseResponse = async <T>(res: Response): Promise<Omit<ApiResult<T>, 'ok' | 'status'>> => {
  const contentType = res.headers.get('content-type') ?? '';
  const bodyText = await res.text();

  if (!bodyText) return { data: null, error: res.ok ? undefined : res.statusText };

  if (contentType.includes('application/json')) {
    try {
      const json = JSON.parse(bodyText) as unknown;
      const errorMessage =
        isRecord(json) && typeof json.message === 'string' ? json.message : undefined;
      return { data: json as T, error: res.ok ? undefined : errorMessage || res.statusText };
    } catch {
      return { data: null, error: 'Failed to parse JSON response' };
    }
  }

  return { data: bodyText as T, error: res.ok ? undefined : res.statusText };
};

const buildHeaders = (init: RequestInit, token?: string) => {
  const headers = new Headers(init.headers);
  headers.set('accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  if (token) headers.set('Authorization', `Bearer ${token}`);

  return headers;
};

const performRequest = (url: string, init: RequestInit) =>
  fetch(url, {
    ...init,
    credentials: 'include',
    cache: 'no-store',
  });

const withJsonBody = (body?: unknown) => (body ? JSON.stringify(body) : undefined);

export async function apiRequest<TResponse, TSchema = unknown>(
  options: ApiRequestOptions<TSchema>,
): Promise<ApiResult<TResponse>> {
  const { path, method = 'GET', body, auth = 'public', schema } = options;
  const apiUrl = `${config.apiBaseUrl}${path}`;

  const token = auth === 'required' ? await getAccessToken() : null;
  const headers = buildHeaders({}, token ?? undefined);

  const firstRes = await performRequest(apiUrl, { method, headers, body: withJsonBody(body) });
  if (firstRes.status === 401 && auth === 'required') {
    const refreshedToken = await refreshAccessToken();
    if (!refreshedToken) {
      return { ok: false, status: firstRes.status, data: null, error: 'Unauthorized' };
    }

    headers.set('Authorization', `Bearer ${refreshedToken}`);
    const retryRes = await performRequest(apiUrl, { method, headers, body: withJsonBody(body) });
    const parsedRetry = await parseResponse<TResponse>(retryRes);

    if (retryRes.ok && refreshedToken) await setAccessToken(refreshedToken);

    if (schema) {
      const safeData = schema.safeParse(parsedRetry.data);
      if (!safeData.success) {
        logger.error('Response schema validation failed', z.treeifyError(safeData.error));
        return { ok: false, status: retryRes.status, data: null, error: 'Invalid response format' };
      }

      return {
        ok: retryRes.ok,
        status: retryRes.status,
        data: safeData.data,
        error: parsedRetry.error,
      };
    }

    return {
      ok: retryRes.ok,
      status: retryRes.status,
      data: parsedRetry.data,
      error: parsedRetry.error,
    };
  }

  const parsed = await parseResponse<TResponse>(firstRes);

  if (schema) {
    const safeData = schema.safeParse(parsed.data);
    if (!safeData.success) {
      logger.error('Response schema validation failed', z.treeifyError(safeData.error));
      return { ok: false, status: firstRes.status, data: null, error: 'Invalid response format' };
    }

    return { ok: firstRes.ok, status: firstRes.status, data: safeData.data, error: parsed.error };
  }

  return { ok: firstRes.ok, status: firstRes.status, data: parsed.data, error: parsed.error };
}
