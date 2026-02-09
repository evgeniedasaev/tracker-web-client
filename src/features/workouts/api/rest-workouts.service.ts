import { apiRequest } from '@/shared/api/rest/server-client';
import {
  WorkoutsResponse,
  WorkoutByIdResponse,
  workoutsResponseSchema,
  workoutByIdResponseSchema,
} from '@/features/workouts/model/contracts';
import {
  WorkoutsService,
  WorkoutsServiceResult,
  WorkoutByIdServiceResult,
} from '@/features/workouts/model/service';
import { mapUnknownResponseErrors } from '@/shared/api/rest/map-error-response';

const mapListResponse = (response: {
  ok: boolean;
  data: WorkoutsResponse | null;
  error?: string;
}) => {
  if (
    response.ok &&
    response.data &&
    'items' in response.data &&
    Array.isArray(response.data.items)
  ) {
    return { ok: true, items: response.data.items } satisfies WorkoutsServiceResult;
  }

  return mapUnknownResponseErrors(response);
};

const mapGetByIdResponse = (response: {
  ok: boolean;
  data: WorkoutByIdResponse | null;
  error?: string;
}) => {
  if (response.ok && response.data && 'id' in response.data) {
    return { ok: true, workout: response.data } satisfies WorkoutByIdServiceResult;
  }

  return mapUnknownResponseErrors(response);
};

export const restWorkoutsService: WorkoutsService = {
  async list() {
    const response = await apiRequest<WorkoutsResponse>({
      path: '/v1/workouts',
      method: 'GET',
      auth: 'required',
      schema: workoutsResponseSchema,
    });

    return mapListResponse(response);
  },

  async getById(workoutId: string) {
    const response = await apiRequest<WorkoutByIdResponse>({
      path: `/v1/workouts/${workoutId}`,
      method: 'GET',
      auth: 'required',
      schema: workoutByIdResponseSchema,
    });

    return mapGetByIdResponse(response);
  },
};
