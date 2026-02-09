import type { Metadata } from 'next';
import { ToastNotifier } from '@/shared/ui/toast';
import { WorkoutFull, getByIdQuery } from '@/features/workouts';

export const metadata: Metadata = {
  title: 'Workout Details | Traker',
  description: 'Your workout details',
};

// Note: in this project, Next passes `params` as a Promise.
export default async function WorkoutPage({ params }: { params: Promise<{ workoutId: string }> }) {
  const { workoutId } = await params;
  const result = await getByIdQuery(workoutId);

  if (!result.success) {
    return <ToastNotifier type="error" message={result.message || 'Не удалость загрузить'} />;
  }

  if (!result.workout) {
    return (
      <>
        <ToastNotifier type="info" message="Тренировка не найдена" />
        <div>Тренировка не найдена</div>
      </>
    );
  }

  return <WorkoutFull workout={result.workout} />;
}
