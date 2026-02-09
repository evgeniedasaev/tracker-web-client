import { WorkoutFull } from '@/features/workouts/ui/WorkoutFull';
import { getByIdAction } from '@/features/workouts/actions/getById.action';

export default async function WorkoutPage({ params }: { params: Promise<{ workoutId: string }> }) {
  const { workoutId } = await params;

  return <WorkoutFull workoutId={workoutId} action={getByIdAction} />;
}
