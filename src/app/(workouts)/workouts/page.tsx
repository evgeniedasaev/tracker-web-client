import { WorkoutsList } from '@/features/workouts/ui/WorkoutsList';
import { listAction } from '@/features/workouts/actions/list.action';

export default function WorkoutsPage() {
  return <WorkoutsList action={listAction} />;
}
