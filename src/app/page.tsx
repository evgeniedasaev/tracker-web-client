import { Metadata } from 'next';
import { HomeHero } from '@/shared/ui/pages';

export const metadata: Metadata = {
  title: 'Tracker',
  description: 'Welcome to tracker app',
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
    </main>
  );
}
