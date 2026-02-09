import { createListUseCase } from '@/features/workouts/model/use-cases';
import { WorkoutsListState } from '@/features/workouts/model/view-model';
import { getWorkoutsService } from '@/features/workouts/service/registry';

const listUseCase = createListUseCase({
  workoutsService: getWorkoutsService(),
  defaultErrorMessage: 'Failed to load workouts',
});

export async function listQuery(prevState: WorkoutsListState): Promise<WorkoutsListState> {
  'use server';
  return listUseCase(prevState);
}
