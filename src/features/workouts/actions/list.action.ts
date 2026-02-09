import { createListAction } from '@/features/workouts/model/use-cases';
import { WorkoutsListState } from '@/features/workouts/model/view-model';
import { getWorkoutsService } from '@/features/workouts/service/registry';

const list = createListAction({
  workoutsService: getWorkoutsService(),
  defaultErrorMessage: 'Failed to load workouts',
});

export async function listAction(prevState: WorkoutsListState): Promise<WorkoutsListState> {
  'use server';
  return list(prevState);
}
