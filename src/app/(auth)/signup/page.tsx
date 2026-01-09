'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signupAction, SignupState } from '@/app/(auth)/actions/signup.action';

const signUpInitialState: SignupState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-neutral mt-2" disabled={pending}>
      {pending ? 'Creating account...' : 'Sign up'}
    </button>
  );
}

function SignupForm() {
  const [signupState, signupFormAction] = useActionState(signupAction, signUpInitialState);
  const { message, fieldErrors } = signupState;

  return (
    <>
      {message ? <p className="text-error text-sm">{message}</p> : null}
      <form className="card-body" action={signupFormAction}>
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

export default function SignUp() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Join now!</h1>
          <div className="divider"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
