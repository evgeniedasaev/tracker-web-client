import { ProblemHero } from '@/shared/ui/pages';

export default function NotFound() {
  return (
    <ProblemHero
      header="404"
      description="Page not found. Check the URL or return to home."
      link={{
        url: '/',
        text: 'Go home',
      }}
    />
  );
}
