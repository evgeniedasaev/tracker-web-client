import { mapErrorServiceResultToState } from '@/shared/model/view-model';
import { WorkoutsListState, WorkoutByIdState } from '@/features/workouts/model/view-model';
import { WorkoutsService } from '@/features/workouts/model/service.interface';

type UseCaseConfig = { workoutsService: WorkoutsService };

export function createListAction({ workoutsService }: UseCaseConfig) {
  return async function listAction(_prevState: WorkoutsListState): Promise<WorkoutsListState> {
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

export function createGetByIdAction({ workoutsService }: UseCaseConfig) {
  return async function getByIdAction(
    _prevState: WorkoutByIdState,
    workoutId: string,
  ): Promise<WorkoutByIdState> {
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
