import { credentialsSchema } from '@/features/auth/api/contracts';

export const validateCredentials = (formData: FormData) =>
  credentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
