'use client';
import { useState, useEffect } from 'react';
import { Workout } from '@/features/workouts/model/types';
import { WorkoutItem } from '@/features/workouts/ui/WorkoutItem';
import { listAction } from '@/features/workouts/actions/list.action';

export function WorkoutsList() {
  const [items, setItems] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await listAction({ success: false });

        if (!res.success) throw new Error('API error');
        if (!cancelled && res.items) setItems(res.items);
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
  }, [listAction]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {items.map((it) => (
        <WorkoutItem key={it.id} workout={it} />
      ))}
    </ul>
  );
}
