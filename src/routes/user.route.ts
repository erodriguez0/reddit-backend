import { Hono } from 'hono';
import { describeRoute, resolver } from 'hono-openapi';

import { customZValidator } from '@/lib/validator';

import { APIErrorSchema } from '@/schemas/error.schema';
import { GetUserParamsSchema } from '@/schemas/user.schema';

import { getUserByUsername } from '@/controllers/user.controller';

const userRoutes = new Hono();

userRoutes.get(
  '/:username',
  describeRoute({
    summary: 'Get user profile',
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: resolver(GetUserParamsSchema),
          },
        },
      },
      400: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: resolver(APIErrorSchema),
          },
        },
      },
      404: {
        description: 'User not found',
        content: {
          'application/json': {
            schema: resolver(APIErrorSchema),
          },
        },
      },
    },
  }),
  customZValidator('param', GetUserParamsSchema),
  getUserByUsername
);

export default userRoutes;
