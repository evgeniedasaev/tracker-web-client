import { config } from '@/shared/config/config';
import type { WorkoutsService } from '@/features/workouts/model/service';
import { restWorkoutsService } from '@/features/workouts/api/rest-workouts.service';
import { createServiceRegistry } from '@/shared/lib/service-registry';

const registry: Record<string, WorkoutsService> = {
  rest: restWorkoutsService,
};

export const getWorkoutsService = createServiceRegistry<WorkoutsService>(
  config.workoutsTransport,
  registry,
);
