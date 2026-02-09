import { createListAction } from '@/features/workouts/model/use-cases';
import { WorkoutsListState } from '@/features/workouts/model/view-model';

const list = createListAction();

export async function listAction(prevState: WorkoutsListState): Promise<WorkoutsListState> {
  'use server';
  return list(prevState);
}
