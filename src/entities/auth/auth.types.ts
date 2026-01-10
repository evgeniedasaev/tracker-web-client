export type AuthSuccess = {
  success?: boolean;
  accessToken: string;
  message?: string;
};

export type AuthError = {
  success?: boolean;
  message?: string;
  code?: string;
  details?: Record<string, string[]>;
};

export type AuthResponse = AuthSuccess | AuthError;
