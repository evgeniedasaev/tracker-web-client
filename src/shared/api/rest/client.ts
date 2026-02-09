import { z } from 'zod';
import { config } from '@/shared/config/config';
import { logger } from '@/shared/lib/logger';

type ApiRequestOptions<TResponse> = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  schema?: z.ZodType<TResponse>;
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

const buildHeaders = (init: RequestInit) => {
  const headers = new Headers(init.headers);
  headers.set('accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  return headers;
};

const performRequest = (url: string, init: RequestInit) =>
  fetch(url, {
    ...init,
    credentials: 'include',
    cache: 'no-store',
  });

const withJsonBody = (body?: unknown) => (body ? JSON.stringify(body) : undefined);

export async function apiRequest<TResponse>(
  options: ApiRequestOptions<TResponse>,
): Promise<ApiResult<TResponse>> {
  const { path, method = 'GET', body, schema } = options;
  const apiUrl = `${config.apiBaseUrl}${path}`;

  const headers = buildHeaders({});
  const res = await performRequest(apiUrl, { method, headers, body: withJsonBody(body) });
  const parsed = await parseResponse<TResponse>(res);

  if (schema) {
    const safeData = schema.safeParse(parsed.data);
    if (!safeData.success) {
      logger.error('Response schema validation failed', z.treeifyError(safeData.error));
      return { ok: false, status: res.status, data: null, error: 'Invalid response format' };
    }

    return { ok: res.ok, status: res.status, data: safeData.data, error: parsed.error };
  }

  return { ok: res.ok, status: res.status, data: parsed.data, error: parsed.error };
}
