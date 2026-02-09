import { z } from 'zod';

export type FieldErrorsResult = Record<string, string[]>;
export type FieldErrorsState = Record<string, string>;

export type ErrorServiceResult = { ok: false; message?: string; fieldErrors?: FieldErrorsResult };

export type ServiceResult<T> = ({ ok: true } & T) | ErrorServiceResult;

export type CommonServiceState = {
  message?: string;
  fieldErrors?: FieldErrorsState;
};

export type ErrorServiceState = CommonServiceState & {
  success: false;
};

export type ServiceState<T> = ({ success: true } & T & CommonServiceState) | ErrorServiceState;

type ErrorTree =
  | {
      fieldErrors?: FieldErrorsResult;
      properties?: Record<string, { errors?: string[] }>;
    }
  | undefined;

export const buildFieldErrors = (errors: FieldErrorsResult = {}): FieldErrorsState =>
  Object.fromEntries(
    Object.entries(errors)
      .filter(([, messages]) => messages.length)
      .map(([key, messages]) => [key, messages[0]]),
  );

export const extractFieldErrors = (tree: ErrorTree): FieldErrorsResult => {
  if (!tree) return {};
  if (tree.fieldErrors) return tree.fieldErrors;

  const properties = tree.properties ?? {};
  const entries = Object.entries(properties)
    .map(([field, value]) => {
      const messages = value.errors ?? [];
      return [field, messages] as const;
    })
    .filter(([, messages]) => messages.length);

  return Object.fromEntries(entries);
};

export function buildStateFromValidation<T>(error: z.ZodError<T>): ServiceState<object> {
  const tree = z.treeifyError<T>(error) as ErrorTree;
  const fieldErrors = buildFieldErrors(extractFieldErrors(tree));
  return {
    success: false,
    message: 'Fix validation errors',
    fieldErrors,
  };
}

export function mapErrorServiceResultToState(
  result: ErrorServiceResult,
  defaultErrorMessage = '',
): ErrorServiceState {
  return {
    success: false,
    message: result.message || defaultErrorMessage,
    fieldErrors: buildFieldErrors(result.fieldErrors),
  };
}
