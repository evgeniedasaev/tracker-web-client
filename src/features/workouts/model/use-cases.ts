import { WorkoutsListState, WorkoutByIdState } from '@/features/workouts/model/view-model';
import { getWorkoutsService } from '@/features/workouts/model/service-registry';
import { mapErrorServiceResultToState } from '@/shared/model/view-model';

export function createListAction() {
  return async function listAction(_prevState: WorkoutsListState): Promise<WorkoutsListState> {
    const workoutsService = getWorkoutsService();
    const result = await workoutsService.list();

    if (result.ok) {
      return {
        success: true,
        items: result.items,
      };
    }

    return mapErrorServiceResultToState(result);
  };
}

export function createGetByIdAction() {
  return async function getByIdAction(
    _prevState: WorkoutByIdState,
    workoutId: string,
  ): Promise<WorkoutByIdState> {
    const workoutsService = getWorkoutsService();
    const result = await workoutsService.getById(workoutId);

    if (result.ok) {
      return {
        success: true,
        workout: result.workout,
      };
    }

    return mapErrorServiceResultToState(result);
  };
}
