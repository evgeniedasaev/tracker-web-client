import Link from 'next/link';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { Workout } from '@/features/workouts/model/types';

type WorkoutProps = {
  workout: Workout;
};

export function WorkoutItem({ workout }: WorkoutProps) {
  return (
    <li key={workout.id}>
      <Link
        href={`/workouts/${workout.id}`}
        className="list-row cursor-pointer hover:shadow-xl hover:scale-101"
      >
        <div>
          <TrophyIcon className="size-10 text-warning" />
        </div>
        <div>
          <div className="text-xl font-bold">{workout.title}</div>
          <div className="text-xs uppercase font-semibold opacity-60">{workout.date}</div>
          {workout.note && <div className="text-md font-semibold opacity-60">{workout.note}</div>}
        </div>
      </Link>
    </li>
  );
}
