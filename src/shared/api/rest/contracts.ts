import { z } from 'zod';

export const apiErrorSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
  details: z.record(z.string(), z.array(z.string())).optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
