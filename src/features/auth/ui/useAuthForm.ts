'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { credentialsSchema } from '@/features/auth/service/contracts';
import type { AuthState } from '@/features/auth/model/view-model';

export type AuthValues = {
  email: string;
  password: string;
};

export type FieldErrors = Partial<Record<keyof AuthValues, string>>;

export type UseAuthFormResult = {
  values: AuthValues;
  displayErrors: FieldErrors;
  showPassword: boolean;
  emailRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
  handleChange: (field: keyof AuthValues, value: string) => void;
  handleBlur: (field: keyof AuthValues) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  togglePassword: () => void;
  syncServerErrors: (errors?: AuthState['fieldErrors']) => void;
  shouldToastSuccess: (message?: string, success?: boolean) => boolean;
};

const validateValues = (values: AuthValues): FieldErrors => {
  const result = credentialsSchema.safeParse(values);
  if (result.success) return {};

  const fieldErrors = result.error.flatten().fieldErrors;
  return {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  };
};

export function useAuthForm(): UseAuthFormResult {
  const [values, setValues] = useState<AuthValues>({ email: '', password: '' });
  const [touched, setTouched] = useState<Record<keyof AuthValues, boolean>>({
    email: false,
    password: false,
  });
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const displayErrors = useMemo<FieldErrors>(() => {
    const errors: FieldErrors = {};
    const showClient = hasSubmitted || touched.email || touched.password;

    // Client errors show after user interaction or submit.
    if (showClient && clientErrors.email) errors.email = clientErrors.email;
    if (showClient && clientErrors.password) errors.password = clientErrors.password;

    // Server errors fill gaps (so they don't override current client errors).
    if (hasSubmitted || Object.keys(serverErrors).length) {
      errors.email = errors.email ?? serverErrors.email;
      errors.password = errors.password ?? serverErrors.password;
    }

    return errors;
  }, [clientErrors, serverErrors, touched, hasSubmitted]);

  // Autofill often updates DOM without firing React events; sync from DOM on mount.
  useEffect(() => {
    const syncFromDom = () => {
      const emailValue = emailRef.current?.value ?? '';
      const passwordValue = passwordRef.current?.value ?? '';
      if (!emailValue && !passwordValue) return;
      setValues((prev) => {
        if (prev.email === emailValue && prev.password === passwordValue) return prev;
        return {
          email: emailValue || prev.email,
          password: passwordValue || prev.password,
        };
      });
    };

    const timers = [100, 300, 800].map((delay) => window.setTimeout(syncFromDom, delay));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  // Debounced client validation reduces error flicker while typing.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setClientErrors(validateValues(values));
    }, 250);
    return () => {
      clearTimeout(id);
    };
  }, [values]);

  const handleChange = (field: keyof AuthValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setServerErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBlur = (field: keyof AuthValues) => {
    const emailValue = emailRef.current?.value ?? values.email;
    const passwordValue = passwordRef.current?.value ?? values.password;
    setValues((prev) => ({
      email: emailValue || prev.email,
      password: passwordValue || prev.password,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setClientErrors(validateValues({ email: emailValue, password: passwordValue }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setHasSubmitted(true);
    setTouched({ email: true, password: true });
    const emailValue = emailRef.current?.value ?? values.email;
    const passwordValue = passwordRef.current?.value ?? values.password;
    setValues({ email: emailValue, password: passwordValue });
    const immediateErrors = validateValues({ email: emailValue, password: passwordValue });
    setClientErrors(immediateErrors);

    // Prevent submit and focus the first invalid field.
    if (immediateErrors.email || immediateErrors.password) {
      event.preventDefault();
      if (immediateErrors.email) emailRef.current?.focus();
      else if (immediateErrors.password) passwordRef.current?.focus();
    }
  };

  return {
    values,
    displayErrors,
    showPassword,
    emailRef,
    passwordRef,
    handleChange,
    handleBlur,
    handleSubmit,
    togglePassword: () => setShowPassword((prev) => !prev),
    syncServerErrors: (errors) => setServerErrors(errors ?? {}),
    shouldToastSuccess: (message, success) => Boolean(success && !message),
  };
}
