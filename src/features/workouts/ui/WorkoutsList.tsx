import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  ChartBarIcon,
  FireIcon,
} from '@heroicons/react/20/solid';
import type { Workout } from '@/features/workouts/model/types';
import { WorkoutItem } from '@/features/workouts/ui/WorkoutItem';

type WorkoutsListProps = {
  items: Workout[];
};

export function WorkoutsList({ items }: WorkoutsListProps) {
  const totalWorkouts = items.length;
  const totalVolume = totalWorkouts * 12000;
  const avgDuration = totalWorkouts ? Math.round(45) : 0;

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-base-content">Workouts</h1>
            <p className="text-sm text-base-content/60">
              Track your volume, intensity, and progress.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="input input-bordered flex items-center gap-2">
              <MagnifyingGlassIcon className="h-4 w-4 text-base-content/50" />
              <input type="text" className="grow" placeholder="Search workouts" />
            </label>
            <button className="btn btn-outline">
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
              Filters
            </button>
            <button className="btn btn-primary">
              <BoltIcon className="h-4 w-4" />
              New workout
            </button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <BoltIcon className="h-4 w-4" />
              Total volume
            </div>
            <div className="mt-2 text-2xl font-semibold text-base-content">
              {totalVolume.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-base-content/50">Mocked for display</div>
          </div>
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <ChartBarIcon className="h-4 w-4" />
              Workouts
            </div>
            <div className="mt-2 text-2xl font-semibold text-base-content">{totalWorkouts}</div>
            <div className="mt-1 text-xs text-base-content/50">This month</div>
          </div>
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <FireIcon className="h-4 w-4" />
              Avg duration
            </div>
            <div className="mt-2 text-2xl font-semibold text-base-content">{avgDuration} min</div>
            <div className="mt-1 text-xs text-base-content/50">Mocked for display</div>
          </div>
        </div>

        <ul className="grid gap-4 lg:grid-cols-2">
          {items.map((it) => (
            <WorkoutItem key={it.id} workout={it} />
          ))}
        </ul>
      </div>
    </section>
  );
}
