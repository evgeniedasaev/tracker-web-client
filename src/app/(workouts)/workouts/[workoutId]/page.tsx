import type { Metadata } from 'next';
import { ToastNotifier } from '@/shared/ui/toast';
import { WorkoutFull, getByIdQuery } from '@/features/workouts';
import { ProblemHero } from '@/shared/ui/pages';

export const metadata: Metadata = {
  title: 'Workout Details | Traker',
  description: 'Your workout details',
};

// Note: in this project, Next passes `params` as a Promise.
export default async function WorkoutPage({ params }: { params: Promise<{ workoutId: string }> }) {
  const { workoutId } = await params;
  const result = await getByIdQuery(workoutId);

  if (!result.success) {
    const message = result.message || 'Somethig happened';
    return (
      <>
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

  if (!result.workout) {
    const message = 'Not found';
    return (
      <>
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

  return <WorkoutFull workout={result.workout} />;
}
