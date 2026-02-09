import { AuthForm } from '@/features/auth';
import { loginAction } from '@/features/auth';

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
