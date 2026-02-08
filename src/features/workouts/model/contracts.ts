import { z } from 'zod';

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

export const workoutsErrorSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
  details: z.record(z.string(), z.array(z.string())).optional(),
});

export const workoutsResponseSchema = z.union([workoutsSuccessSchema, workoutsErrorSchema]);
export const workoutByIdResponseSchema = z.union([workoutScheme, workoutsErrorSchema]);

export type WorkoutsResponse = z.infer<typeof workoutsResponseSchema>;
export type WorkoutByIdResponse = z.infer<typeof workoutByIdResponseSchema>;
