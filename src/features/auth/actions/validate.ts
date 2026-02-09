import { credentialsSchema } from '@/features/auth/service/contracts';

export const validateCredentials = (formData: FormData) =>
  credentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
