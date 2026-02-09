import type { Metadata } from 'next';
import { WorkoutFull, getByIdAction } from '@/features/workouts';

export const metadata: Metadata = {
  title: 'Workout Details | Traker',
  description: 'Your workout details',
};

// Note: in this project, Next passes `params` as a Promise.
export default async function WorkoutPage({ params }: { params: Promise<{ workoutId: string }> }) {
  const { workoutId } = await params;

  return <WorkoutFull workoutId={workoutId} action={getByIdAction} />;
}
