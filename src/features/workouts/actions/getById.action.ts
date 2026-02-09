import { createGetByIdAction } from '@/features/workouts/model/use-cases';
import { WorkoutByIdState } from '@/features/workouts/model/view-model';

const getById = createGetByIdAction();

export async function getByIdAction(
  prevState: WorkoutByIdState,
  workoutId: string,
): Promise<WorkoutByIdState> {
  'use server';
  return getById(prevState, workoutId);
}
