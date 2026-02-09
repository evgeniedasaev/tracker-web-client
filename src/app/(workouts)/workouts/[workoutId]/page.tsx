import { WorkoutFull } from '@/features/workouts';

// Note: in this project, Next passes `params` as a Promise.
export default async function WorkoutPage({ params }: { params: Promise<{ workoutId: string }> }) {
  const { workoutId } = await params;

  return <WorkoutFull workoutId={workoutId} />;
}
