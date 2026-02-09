import Link from 'next/link';
import {
  CalendarDaysIcon,
  ClockIcon,
  BoltIcon,
  FireIcon,
  TagIcon,
  ArrowRightIcon,
} from '@heroicons/react/20/solid';
import type { Workout } from '@/features/workouts/model/types';

type WorkoutProps = {
  workout: Workout;
};

type MockMeta = {
  intensity: 'low' | 'medium' | 'high';
  durationMin: number;
  volume: number;
  exercises: number;
  calories: number;
  splitLabel: string;
  accentClassName: string;
};

const intensityMeta = {
  low: { label: 'Low', className: 'badge-success' },
  medium: { label: 'Medium', className: 'badge-warning' },
  high: { label: 'High', className: 'badge-error' },
} as const;

const splitLabels = ['Push', 'Pull', 'Legs', 'Full Body', 'Upper', 'Lower'] as const;
const accentClasses = [
  'from-primary/10 via-base-100 to-base-100',
  'from-secondary/10 via-base-100 to-base-100',
  'from-accent/10 via-base-100 to-base-100',
  'from-warning/10 via-base-100 to-base-100',
] as const;

const hashSeed = (value: string) =>
  value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

const getMockMeta = (id: string): MockMeta => {
  const seed = hashSeed(id);
  const intensity = (['low', 'medium', 'high'] as const)[seed % 3];
  const durationMin = 35 + (seed % 5) * 10;
  const volume = 8000 + (seed % 6) * 2500;
  const exercises = 4 + (seed % 5);
  const calories = 320 + (seed % 6) * 60;
  const splitLabel = splitLabels[seed % splitLabels.length];
  const accentClassName = accentClasses[seed % accentClasses.length];

  return {
    intensity,
    durationMin,
    volume,
    exercises,
    calories,
    splitLabel,
    accentClassName,
  };
};

export function WorkoutItem({ workout }: WorkoutProps) {
  const meta = getMockMeta(workout.id);
  const intensityData = intensityMeta[meta.intensity];

  return (
    <li key={workout.id} className="group">
      <Link
        href={`/workouts/${workout.id}`}
        className={`card bg-base-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
      >
        <div className={`card-body gap-4 bg-gradient-to-br ${meta.accentClassName}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-base-content/60">
                <CalendarDaysIcon className="h-4 w-4" />
                <span className="uppercase tracking-wide">{workout.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-base-content">{workout.title}</h3>
              {workout.note ? (
                <p className="line-clamp-2 text-sm text-base-content/70">{workout.note}</p>
              ) : (
                <p className="text-sm text-base-content/40">No notes yet</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <span className={`badge ${intensityData.className} badge-outline`}>
                <FireIcon className="mr-1 h-3.5 w-3.5" />
                {intensityData.label}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/70">
            <span className="badge badge-ghost">
              <ClockIcon className="mr-1 h-3.5 w-3.5" />
              {meta.durationMin} min
            </span>
            <span className="badge badge-ghost">
              <BoltIcon className="mr-1 h-3.5 w-3.5" />
              {meta.volume.toLocaleString()} vol
            </span>
            <span className="badge badge-ghost">
              <TagIcon className="mr-1 h-3.5 w-3.5" />
              {meta.splitLabel} • {meta.exercises} ex
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-base-content/60">
            <span>{meta.calories} kcal</span>
            <span className="inline-flex items-center gap-2 font-semibold text-base-content/80">
              View
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
