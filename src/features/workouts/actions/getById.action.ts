import { createGetByIdAction } from '@/features/workouts/model/use-cases';
import { WorkoutByIdState } from '@/features/workouts/model/view-model';
import { getWorkoutsService } from '@/features/workouts/service/registry';

const getById = createGetByIdAction({
  workoutsService: getWorkoutsService(),
});

export async function getByIdAction(
  prevState: WorkoutByIdState,
  workoutId: string,
): Promise<WorkoutByIdState> {
  'use server';
  return getById(prevState, workoutId);
}
