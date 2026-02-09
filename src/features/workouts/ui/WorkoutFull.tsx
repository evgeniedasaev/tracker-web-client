import {
  CalendarDaysIcon,
  ClockIcon,
  BoltIcon,
  PencilSquareIcon,
  TrashIcon,
  FireIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/20/solid';
import type { Workout } from '@/features/workouts/model/types';

type WorkoutFullProps = {
  workout: Workout;
  variant?: 'compact' | 'expanded';
  durationMin?: number;
  volume?: number;
  intensity?: 'low' | 'medium' | 'high';
};

const intensityMeta = {
  low: { label: 'Low', className: 'badge-success' },
  medium: { label: 'Medium', className: 'badge-warning' },
  high: { label: 'High', className: 'badge-error' },
} as const;

export function WorkoutFull({
  workout,
  variant = 'expanded',
  durationMin = 45,
  volume = 12000,
  intensity = 'medium',
}: WorkoutFullProps) {
  const intensityData = intensityMeta[intensity] ?? intensityMeta.medium;
  const isCompact = variant === 'compact';

  return (
    <section className="relative w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-6 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-6 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      <div
        className={
          isCompact
            ? 'card bg-base-100/90 shadow-xl backdrop-blur'
            : 'card bg-base-100/90 shadow-xl lg:shadow-2xl backdrop-blur'
        }
      >
        <div className="card-body gap-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>{workout.date}</span>
              </div>
              <h1 className="text-2xl font-semibold text-base-content sm:text-3xl">
                {workout.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <div className={`badge ${intensityData.className} badge-outline`}>
                  <FireIcon className="mr-1 h-3.5 w-3.5" />
                  {intensityData.label}
                </div>
                {durationMin ? (
                  <div className="badge badge-ghost">
                    <ClockIcon className="mr-1 h-3.5 w-3.5" />
                    {durationMin} min
                  </div>
                ) : null}
                {volume ? (
                  <div className="badge badge-ghost">
                    <BoltIcon className="mr-1 h-3.5 w-3.5" />
                    {volume} total
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn btn-ghost btn-sm">
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </button>
              <button className="btn btn-outline btn-sm btn-error">
                <TrashIcon className="h-4 w-4" />
                Delete
              </button>
            </div>
          </header>

          <div className={isCompact ? 'grid gap-4' : 'grid gap-4 lg:grid-cols-[2fr_1fr]'}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-base-200 bg-base-200/50 p-4 transition hover:-translate-y-0.5 hover:bg-base-200/80 hover:shadow-md">
                <div className="flex items-center gap-2 text-sm font-semibold text-base-content/70">
                  <DocumentTextIcon className="h-4 w-4" />
                  Notes
                </div>
                {workout.note ? (
                  <p className="mt-2 text-sm leading-6 text-base-content/80">{workout.note}</p>
                ) : (
                  <p className="mt-2 text-sm text-base-content/50">
                    No notes for this workout yet.
                  </p>
                )}
              </div>

              {!isCompact ? (
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-base-content/70">
                    <span className="flex items-center gap-2">
                      <ChartBarIcon className="h-4 w-4" />
                      Summary
                    </span>
                    <span className="text-xs text-base-content/50">
                      Updated {workout.updatedAt}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-base-200/50 p-3">
                      <div className="text-xs text-base-content/60">Created</div>
                      <div className="text-sm font-semibold text-base-content">
                        {workout.createdAt}
                      </div>
                    </div>
                    <div className="rounded-xl bg-base-200/50 p-3">
                      <div className="text-xs text-base-content/60">Last update</div>
                      <div className="text-sm font-semibold text-base-content">
                        {workout.updatedAt}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {!isCompact ? (
              <aside className="space-y-4">
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                  <div className="text-sm font-semibold text-base-content/70">Quick actions</div>
                  <div className="mt-3 space-y-2">
                    <button className="btn btn-primary btn-sm w-full">Start workout</button>
                    <button className="btn btn-ghost btn-sm w-full">Duplicate</button>
                  </div>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                  <div className="text-sm font-semibold text-base-content/70">Focus</div>
                  <p className="mt-2 text-sm text-base-content/60">
                    Keep your rest times tight and maintain form on the main lifts.
                  </p>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
