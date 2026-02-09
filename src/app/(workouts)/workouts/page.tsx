import type { Metadata } from 'next';
import { ToastNotifier } from '@/shared/ui/toast';
import { WorkoutsList, listQuery } from '@/features/workouts';

export const metadata: Metadata = {
  title: 'Workouts | Traker',
  description: 'Your workouts list',
};

export default async function WorkoutsPage() {
  const result = await listQuery();

  if (!result.success) {
    return <ToastNotifier type="error" message={result.message || 'Не удалость загрузить'} />;
  }

  if (!result.items) {
    return (
      <>
        <ToastNotifier type="info" message="Тренировок нет" />
        <div>Тренировок нет</div>
      </>
    );
  }

  return <WorkoutsList items={result.items} />;
}
