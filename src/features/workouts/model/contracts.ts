import { z } from 'zod';
import { apiErrorSchema } from '@/shared/api/rest/contracts';

export const workoutScheme = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  note: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const workoutsSuccessSchema = z.object({
  success: z.boolean().optional(),
  items: z.array(workoutScheme),
});

export const workoutsResponseSchema = z.union([workoutsSuccessSchema, apiErrorSchema]);
export const workoutByIdResponseSchema = z.union([workoutScheme, apiErrorSchema]);

export type WorkoutsResponse = z.infer<typeof workoutsResponseSchema>;
export type WorkoutByIdResponse = z.infer<typeof workoutByIdResponseSchema>;
