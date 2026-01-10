import { z } from 'zod';
import type { Credentials, AuthFieldErrors } from '@/features/auth/model/contracts';

export type AuthState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const buildFieldErrors = (errors: AuthFieldErrors = {}): Record<string, string> =>
  Object.fromEntries(
    Object.entries(errors)
      .filter(([, messages]) => messages.length)
      .map(([key, messages]) => [key, messages[0]]),
  );

type ErrorTree =
  | {
      fieldErrors?: AuthFieldErrors;
      properties?: Record<string, { errors?: string[] }>;
    }
  | undefined;

const extractFieldErrors = (tree: ErrorTree): AuthFieldErrors => {
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

export const buildStateFromValidation = (error: z.ZodError<Credentials>): AuthState => {
  const tree = z.treeifyError<Credentials>(error);
  const fieldErrors = buildFieldErrors(extractFieldErrors(tree));
  return {
    success: false,
    message: 'Fix validation errors',
    fieldErrors,
  };
};
