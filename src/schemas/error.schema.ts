import { z } from 'zod';

export const APIErrorSchema = z.object({
  field: z.string().nullish(),
  code: z.string().nullish(),
  message: z.string(),
});

export type APIError = z.infer<typeof APIErrorSchema>;
