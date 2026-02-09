'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import type { AuthState } from '@/features/auth/model/view-model';
import { useToast } from '@/shared/ui/toast';
import { SubmitButton } from '@/features/auth/ui/SubmitButton';
import { credentialsSchema } from '@/features/auth/service/contracts';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

type AuthFormProps = {
  title: string;
  cta: string;
  pendingLabel: string;
  action: (_state: AuthState, formData: FormData) => Promise<AuthState>;
};

type AuthValues = {
  email: string;
  password: string;
};

type FieldErrors = Partial<Record<keyof AuthValues, string>>;

const validateValues = (values: AuthValues): FieldErrors => {
  const result = credentialsSchema.safeParse(values);
  if (result.success) return {};

  const fieldErrors = result.error.flatten().fieldErrors;
  const email = fieldErrors.email?.[0];
  const password = fieldErrors.password?.[0];

  return {
    email,
    password,
  };
};

function FormFields({
  values,
  errors,
  onChange,
  onBlur,
  showPassword,
  onTogglePassword,
  pendingLabel,
  cta,
  emailRef,
  passwordRef,
}: {
  values: AuthValues;
  errors: FieldErrors;
  onChange: (field: keyof AuthValues, value: string) => void;
  onBlur: (field: keyof AuthValues) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  pendingLabel: string;
  cta: string;
  emailRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
}) {
  const { pending } = useFormStatus();
  const pendingClassName = pending ? 'opacity-70 pointer-events-none' : '';

  return (
    <fieldset className={`fieldset ${pendingClassName}`}>
      <label className="label">Email</label>
      <input
        ref={emailRef}
        id="email"
        type="email"
        name="email"
        value={values.email}
        onChange={(event) => {
          onChange('email', event.target.value);
        }}
        onBlur={() => {
          onBlur('email');
        }}
        className={`input ${errors.email ? 'input-error' : ''}`}
        placeholder="you@example.com"
        required
      />
      {errors.email ? <p className="text-error text-sm">{errors.email}</p> : null}
      <label className="label">Password</label>
      <div className="join w-full">
        <input
          ref={passwordRef}
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={(event) => {
            onChange('password', event.target.value);
          }}
          onBlur={() => {
            onBlur('password');
          }}
          className={`input join-item w-full ${errors.password ? 'input-error' : ''}`}
          placeholder="******"
          required
        />
        <button
          type="button"
          className="btn join-item btn-ghost"
          onClick={onTogglePassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </button>
      </div>
      {errors.password ? <p className="text-error text-sm">{errors.password}</p> : null}
      <SubmitButton pendingLabel={pendingLabel} cta={cta} />
    </fieldset>
  );
}

export function AuthForm({ title, cta, pendingLabel, action }: AuthFormProps) {
  const [state, formAction] = useActionState(action, { success: false });
  const { message, fieldErrors, success } = state;
  const { notify } = useToast();
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

    if (showClient && clientErrors.email) errors.email = clientErrors.email;
    if (showClient && clientErrors.password) errors.password = clientErrors.password;

    if (hasSubmitted || Object.keys(serverErrors).length) {
      errors.email = errors.email ?? serverErrors.email;
      errors.password = errors.password ?? serverErrors.password;
    }

    return errors;
  }, [clientErrors, serverErrors, touched, hasSubmitted]);

  useEffect(() => {
    if (!message) return;
    notify(message, success ? 'success' : 'error');
  }, [message, notify, success]);

  useEffect(() => {
    if (!success) return;
    if (message) return;
    notify('Success', 'success');
  }, [message, notify, success]);

  useEffect(() => {
    setServerErrors(fieldErrors ?? {});
  }, [fieldErrors]);

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
    setTouched((prev) => ({ ...prev, [field]: true }));
    setClientErrors(validateValues(values));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setHasSubmitted(true);
    setTouched({ email: true, password: true });
    const immediateErrors = validateValues(values);
    setClientErrors(immediateErrors);

    if (immediateErrors.email || immediateErrors.password) {
      event.preventDefault();
      if (immediateErrors.email) emailRef.current?.focus();
      else if (immediateErrors.password) passwordRef.current?.focus();
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md w-full">
          <h1 className="text-5xl font-bold">{title}</h1>
          <div className="divider" />
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" action={formAction} onSubmit={handleSubmit}>
              <FormFields
                values={values}
                errors={displayErrors}
                onChange={handleChange}
                onBlur={handleBlur}
                showPassword={showPassword}
                onTogglePassword={() => {
                  setShowPassword((prev) => !prev);
                }}
                pendingLabel={pendingLabel}
                cta={cta}
                emailRef={emailRef}
                passwordRef={passwordRef}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
