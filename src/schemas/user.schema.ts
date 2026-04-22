import { z } from '@hono/zod-openapi';

import { image, username } from '@/schemas/index.schema';

export const GetUserParamsSchema = z.object({
  username: username.openapi({
    param: { name: 'username', in: 'path' },
  }),
});

export const UserResponseSchema = z.object({
  username: username,
  displayUsername: username,
  image: image,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GetUserParams = z.infer<typeof GetUserParamsSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
