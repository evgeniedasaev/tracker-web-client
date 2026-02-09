'use client';

import { useActionState, useEffect } from 'react';
import type { AuthState } from '@/features/auth/model/view-model';
import { useToast } from '@/shared/ui/toast';
import { SubmitButton } from '@/features/auth/ui/SubmitButton';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { useAuthForm } from '@/features/auth/ui/useAuthForm';
import { useFormStatus } from 'react-dom';
import { AuthSidePanel } from '@/shared/ui/pages';

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
        className={`input w-full ${errors.email ? 'input-error' : ''}`}
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
    <section className="relative min-h-screen bg-base-200">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 left-8 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <AuthSidePanel />

          <div className="card bg-base-100/90 shadow-2xl backdrop-blur">
            <div className="card-body">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-base-content">{cta}</h2>
                <p className="text-sm text-base-content/60">Use your email and password.</p>
              </div>
              <form className="space-y-2" action={formAction} onSubmit={handleSubmit}>
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
    </section>
  );
}
