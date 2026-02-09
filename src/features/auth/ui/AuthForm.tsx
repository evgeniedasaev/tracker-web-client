'use client';

import { useActionState, useEffect } from 'react';
import type { AuthState } from '@/features/auth/model/view-model';
import { useToast } from '@/shared/ui/ToastProvider';
import { SubmitButton } from '@/features/auth/ui/SubmitButton';

type AuthFormProps = {
  title: string;
  cta: string;
  pendingLabel: string;
  action: (_state: AuthState, formData: FormData) => Promise<AuthState>;
};

export function AuthForm({ title, cta, pendingLabel, action }: AuthFormProps) {
  const [state, formAction] = useActionState(action, { success: false });
  const { message, fieldErrors, success } = state;
  const { notify } = useToast();

  useEffect(() => {
    if (!message) return;
    notify(message, success ? 'success' : 'error');
  }, [message, notify, success]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md w-full">
          <h1 className="text-5xl font-bold">{title}</h1>
          <div className="divider" />
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" action={formAction}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue=""
                  className={`input ${fieldErrors?.email ? 'input-error' : ''}`}
                  placeholder="you@example.com"
                  required
                />
                {fieldErrors?.email ? (
                  <p className="text-error text-sm">{fieldErrors.email}</p>
                ) : null}
                <label className="label">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  defaultValue=""
                  className={`input ${fieldErrors?.password ? 'input-error' : ''}`}
                  placeholder="******"
                  required
                />
                {fieldErrors?.password ? (
                  <p className="text-error text-sm">{fieldErrors.password}</p>
                ) : null}
                <SubmitButton pendingLabel={pendingLabel} cta={cta} />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
