'use client';

import { useActionState, useEffect } from 'react';
import type { AuthState } from '@/features/auth/model/view-model';
import { useToast } from '@/shared/ui/toast';
import { SubmitButton } from '@/features/auth/ui/SubmitButton';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { useAuthForm } from '@/features/auth/ui/useAuthForm';
import { useFormStatus } from 'react-dom';

type AuthFormProps = {
  title: string;
  cta: string;
  pendingLabel: string;
  action: (_state: AuthState, formData: FormData) => Promise<AuthState>;
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
  values: { email: string; password: string };
  errors: { email?: string; password?: string };
  onChange: (field: 'email' | 'password', value: string) => void;
  onBlur: (field: 'email' | 'password') => void;
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
        autoComplete="email"
        onChange={(event) => onChange('email', event.target.value)}
        onInput={(event) => onChange('email', event.currentTarget.value)}
        onBlur={() => onBlur('email')}
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
          autoComplete="current-password"
          onChange={(event) => onChange('password', event.target.value)}
          onInput={(event) => onChange('password', event.currentTarget.value)}
          onBlur={() => onBlur('password')}
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
  const {
    values,
    displayErrors,
    showPassword,
    emailRef,
    passwordRef,
    handleChange,
    handleBlur,
    handleSubmit,
    togglePassword,
    syncServerErrors,
    shouldToastSuccess,
  } = useAuthForm();

  useEffect(() => {
    if (!message) return;
    notify(message, success ? 'success' : 'error');
  }, [message, notify, success]);

  useEffect(() => {
    if (!shouldToastSuccess(message, success)) return;
    notify('Success', 'success');
  }, [message, notify, shouldToastSuccess, success]);

  useEffect(() => {
    syncServerErrors(fieldErrors);
  }, [fieldErrors, syncServerErrors]);

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
                onTogglePassword={togglePassword}
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
