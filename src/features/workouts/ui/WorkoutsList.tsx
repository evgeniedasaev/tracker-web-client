import { Workout } from '@/features/workouts/model/types';
import { WorkoutItem } from '@/features/workouts/ui/WorkoutItem';

type WorkoutsListProps = {
  items: Workout[];
};

export function WorkoutsList({ items }: WorkoutsListProps) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {items.map((it) => (
        <WorkoutItem key={it.id} workout={it} />
      ))}
    </ul>
  );
}
