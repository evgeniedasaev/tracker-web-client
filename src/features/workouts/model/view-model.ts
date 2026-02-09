import { ServiceState } from '@/shared/model/view-model';

export type Workout = {
  id: string;
  date: string;
  title: string;
  note?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type WorkoutsListState = ServiceState<{
  items?: Workout[] | [];
}>;

export type WorkoutByIdState = ServiceState<{
  workout?: Workout | null;
}>;
