import { ServiceState } from '@/shared/model/view-model';
import { Workout } from '@/features/workouts/model/types';

export type WorkoutsListState = ServiceState<{
  items?: Workout[];
}>;

export type WorkoutByIdState = ServiceState<{
  workout?: Workout | null;
}>;
