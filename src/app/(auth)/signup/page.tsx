import { AuthForm } from '@/features/auth';
import { signupAction } from '@/features/auth';

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
