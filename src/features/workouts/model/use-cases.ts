import { mapErrorServiceResultToState } from '@/shared/model/view-model';
import { WorkoutsListState, WorkoutByIdState } from '@/features/workouts/model/view-model';
import { WorkoutsService } from '@/features/workouts/model/service.interface';

type UseCaseConfig = {
  workoutsService: WorkoutsService;
  defaultErrorMessage?: string;
};

export function createListUseCase({ workoutsService, defaultErrorMessage }: UseCaseConfig) {
  return async function listUseCase(): Promise<WorkoutsListState> {
    const result = await workoutsService.list();

    if (result.ok) {
      return {
        success: true,
        items: result.items,
      };
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}

export function createGetByIdUseCase({ workoutsService, defaultErrorMessage }: UseCaseConfig) {
  return async function getByIdUseCase(workoutId: string): Promise<WorkoutByIdState> {
    const result = await workoutsService.getById(workoutId);

    if (result.ok) {
      return {
        success: true,
        workout: result.workout,
      };
    }

    return mapErrorServiceResultToState(result, defaultErrorMessage);
  };
}
