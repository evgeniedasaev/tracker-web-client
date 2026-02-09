import { createGetByIdUseCase } from '@/features/workouts/model/use-cases';
import { WorkoutByIdState } from '@/features/workouts/model/view-model';
import { getWorkoutsService } from '@/features/workouts/service/registry';

const getByIdUseCase = createGetByIdUseCase({
  workoutsService: getWorkoutsService(),
  defaultErrorMessage: 'Workout not found',
});

export async function getByIdQuery(
  prevState: WorkoutByIdState,
  workoutId: string,
): Promise<WorkoutByIdState> {
  'use server';
  return getByIdUseCase(prevState, workoutId);
}
