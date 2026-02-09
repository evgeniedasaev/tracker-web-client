import { apiErrorSchema, ApiError } from '@/shared/api/contracts';
import { ErrorServiceResult } from '@/shared/model/view-model';

type ApiResponseLike = {
  ok: boolean;
  data: ApiError | null;
  error?: string;
};

export function mapResponseErrors(response: ApiResponseLike): ErrorServiceResult {
  const parsed = apiErrorSchema.safeParse(response.data);
  const message = parsed.success ? parsed.data.message : undefined;
  const details = parsed.success ? parsed.data.details : undefined;

  return {
    ok: false,
    message: message || response.error,
    fieldErrors: details,
  };
}

type UnknownApiResponseLike = {
  ok: boolean;
  data: unknown | null;
  error?: string;
};

export function mapUnknownResponseErrors(response: UnknownApiResponseLike): ErrorServiceResult {
  const parsedError = apiErrorSchema.safeParse(response.data);
  const errorData = parsedError.success ? parsedError.data : null;
  return mapResponseErrors({ ok: response.ok, data: errorData, error: response.error });
}
