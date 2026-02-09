import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { Workout } from '@/features/workouts/model/types';

type WorkoutProps = {
  workout: Workout;
};

export function WorkoutFull({ workout }: WorkoutProps) {
  return (
    <div>
      <div className="text-xl font-bold">{workout.title}</div>
      <div className="text-xs uppercase font-semibold opacity-60">{workout.date}</div>
      {workout.note && <div className="text-md font-semibold opacity-60">{workout.note}</div>}
      <div>
        <button className="btn btn-square btn-ghost">
          <PencilSquareIcon className="size-[1.2em]" />
        </button>
        <button className="btn btn-square btn-ghost">
          <XCircleIcon className="size-[1.2em]" />
        </button>
      </div>
    </div>
  );
}
