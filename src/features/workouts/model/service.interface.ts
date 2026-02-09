import { ServiceResult } from '@/shared/model/view-model';
import { Workout } from '@/features/workouts/model/types';

export type WorkoutsServiceResult = ServiceResult<{ items: Workout[] }>;
export type WorkoutByIdServiceResult = ServiceResult<{ workout: Workout }>;

export type WorkoutsService = {
  list(): Promise<WorkoutsServiceResult>;
  getById(workoutId: string): Promise<WorkoutByIdServiceResult>;
};
