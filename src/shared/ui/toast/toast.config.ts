export type ToastConfig = {
  message: string;
  type: 'success' | 'error' | 'info';
};

export const toastMap = {
  auth_login_success: {
    message: 'Successfully logged in',
    type: 'success',
  },
  auth_signup_success: {
    message: 'Account created successfully',
    type: 'success',
  },
  auth_login_error: {
    message: 'Login failed',
    type: 'error',
  },
  auth_signup_error: {
    message: 'Signup failed',
    type: 'error',
  },
} satisfies Record<string, ToastConfig>;

export type ToastKey = keyof typeof toastMap;

export const TOAST_KEYS: Record<ToastKey, ToastKey> = {
  auth_login_success: 'auth_login_success',
  auth_signup_success: 'auth_signup_success',
  auth_login_error: 'auth_login_error',
  auth_signup_error: 'auth_signup_error',
};
