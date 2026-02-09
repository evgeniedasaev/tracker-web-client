import type { Metadata } from 'next';
import { WorkoutsList, listQuery } from '@/features/workouts';

export const metadata: Metadata = {
  title: 'Workouts | Traker',
  description: 'Your workouts list',
};

export default function WorkoutsPage() {
  return <WorkoutsList action={listQuery} />;
}
