import { ServiceResult } from '@/shared/lib/view-model.helpers';
import { Workout } from '@/features/workouts/model/view-model';

export type WorkoutsServiceResult = ServiceResult<{ items: Workout[] }>;
export type WorkoutByIdServiceResult = ServiceResult<{ workout: Workout }>;

export type WorkoutsService = {
  list(): Promise<WorkoutsServiceResult>;
  getById(workoutId: string): Promise<WorkoutByIdServiceResult>;
};
