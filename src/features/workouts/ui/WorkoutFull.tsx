'use client';
import { useEffect, useState } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { Workout } from '@/features/workouts/model/types';
import type { WorkoutByIdState } from '@/features/workouts/model/view-model';

type WorkoutProps = {
  workoutId: string;
  action: (_state: WorkoutByIdState, workoutId: string) => Promise<WorkoutByIdState>;
};

export function WorkoutFull({ workoutId, action }: WorkoutProps) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await action({ success: false }, workoutId);

        if (!res.success) throw new Error('API error');
        if (!cancelled && res.workout) setWorkout(res.workout);
      } catch (e) {
        if (!cancelled) setError('Не удалось загрузить');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [action, workoutId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!workout) return <div>Не найдено</div>;

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
