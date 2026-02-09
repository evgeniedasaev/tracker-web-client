import type { Metadata } from 'next';
import { AuthForm, loginAction } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Login | Traker',
  description: 'Your workouts list',
};

export default function LoginPage() {
  return (
    <AuthForm
      title="Welcome back!"
      cta="Log in"
      pendingLabel="Logging in..."
      action={loginAction}
    />
  );
}
