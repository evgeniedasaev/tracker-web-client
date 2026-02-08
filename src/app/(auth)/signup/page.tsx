import { AuthForm } from '@/features/auth/ui/AuthForm';
import { signupAction } from '@/features/auth/actions/signup.action';

export default function SignUpPage() {
  return (
    <AuthForm
      title="Join now!"
      cta="Sign up"
      pendingLabel="Creating account..."
      action={signupAction}
    />
  );
}
