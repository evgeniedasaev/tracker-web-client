import type { Metadata } from 'next';
import { AuthForm, signupAction } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Join is now | Traker',
  description: 'Your workouts list',
};

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
