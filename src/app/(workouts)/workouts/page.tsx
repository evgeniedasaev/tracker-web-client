import type { Metadata } from 'next';
import { ToastFromSearch, ToastNotifier } from '@/shared/ui/toast';
import { WorkoutsList, listQuery } from '@/features/workouts';
import { ProblemHero } from '@/shared/ui/pages';

export const metadata: Metadata = {
  title: 'Workouts | Traker',
  description: 'Your workouts list',
};

export default async function WorkoutsPage() {
  const result = await listQuery();

  if (!result.success) {
    const message = result.message || 'Something happened';
    return (
      <>
        <ToastFromSearch />
        <ToastNotifier type="error" message={message} />
        <ProblemHero
          header="Something happened"
          description={message}
          link={{
            url: '/',
            text: 'Go home',
          }}
        />
      </>
    );
  }

  if (!result.items) {
    const message = 'Workouts list is empty';
    return (
      <>
        <ToastFromSearch />
        <ToastNotifier type="info" message={message} />
        <ProblemHero
          header="404"
          description={message}
          link={{
            url: '/',
            text: 'Go home',
          }}
        />
      </>
    );
  }

  return (
    <>
      <ToastFromSearch />
      <WorkoutsList items={result.items} />
    </>
  );
}
