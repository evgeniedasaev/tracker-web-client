import { AuthForm } from '@/features/auth/ui/AuthForm';
import { loginAction } from '@/features/auth/actions/login.action';

export default function Login() {
  return (
    <AuthForm
      title="Welcome back!"
      cta="Log in"
      pendingLabel="Logging in..."
      action={loginAction}
    />
  );
}
