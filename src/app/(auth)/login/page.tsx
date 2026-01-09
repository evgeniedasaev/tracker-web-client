'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, LoginState } from '@/app/(auth)/actions/login.action';

const loginInitialState: LoginState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-neutral mt-2" disabled={pending}>
      {pending ? 'Loggin in...' : 'Log In'}
    </button>
  );
}

function LoginForm() {
  const [loginState, loginFormAction] = useActionState(loginAction, loginInitialState);
  const { message, fieldErrors } = loginState;

  return (
    <>
      {message ? <p className="text-error text-sm m-4">{message}</p> : null}
      <form className="card-body" action={loginFormAction}>
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
          {fieldErrors?.email ? <p className="text-error text-sm">{fieldErrors.email}</p> : null}
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
          <SubmitButton />
        </fieldset>
      </form>
    </>
  );
}

export default function Login() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Wekcome back!</h1>
          <div className="divider"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
