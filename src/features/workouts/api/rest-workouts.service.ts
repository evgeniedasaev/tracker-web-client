import { apiRequest } from '@/shared/api/client';
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

const mapResponseErrors = (response: {
  ok: boolean;
  data: WorkoutsResponse | null;
  error?: string;
}) => {
  return {
    ok: false,
    message: response.data ? response.data?.message : response.error,
    fieldErrors: response.data && 'details' in response.data ? response.data.details : undefined,
  } satisfies WorkoutsServiceResult;
};

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

  return mapResponseErrors(response);
};

const mapGetByIdResponse = (response: {
  ok: boolean;
  data: WorkoutByIdResponse | null;
  error?: string;
}) => {
  if (response.ok && response.data) {
    return { ok: true, workout: response.data } satisfies WorkoutByIdServiceResult;
  }

  return mapResponseErrors(response);
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
