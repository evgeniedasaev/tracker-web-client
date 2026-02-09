import type { WorkoutDto } from '@/features/workouts/service/contracts';
import type { Workout } from '@/features/workouts/model/types';

export const mapWorkoutDto = (dto: WorkoutDto): Workout => ({
  id: dto.id,
  date: dto.date,
  title: dto.title,
  note: dto.note ?? null,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

export const mapWorkoutListDto = (items: WorkoutDto[]): Workout[] =>
  items.map(mapWorkoutDto);
