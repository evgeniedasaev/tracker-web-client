import { Metadata } from 'next';
import { HomeHeroPrivate, HomeHeroPublic } from '@/shared/ui/pages';
import { isAuthenticatedQuery } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Forge',
  description: 'Welcome to Forge',
};

export default async function HomePage() {
  const authenticated = await isAuthenticatedQuery();

  return <main>{authenticated ? <HomeHeroPrivate /> : <HomeHeroPublic />}</main>;
}
