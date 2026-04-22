import { Hono } from 'hono';
import { describeRoute, resolver } from 'hono-openapi';

import { customZValidator } from '@/lib/validator';

import { AuthResponseSchema, SignInSchema, SignUpSchema } from '@/schemas/auth.schema';
import { APIErrorSchema } from '@/schemas/error.schema';

import { signIn, signUp } from '@/controllers/auth.controller';

const authRoutes = new Hono();

authRoutes.post(
  '/sign-up',
  describeRoute({
    summary: 'Sign up',
    description: 'Register a new user account',
    responses: {
      201: {
        description: 'Signed up successfully',
        content: {
          'application/json': { schema: resolver(AuthResponseSchema) },
        },
      },
      422: {
        description: 'Validation failed',
        content: {
          'application/json': { schema: resolver(APIErrorSchema.array()) },
        },
      },
    },
  }),
  customZValidator('json', SignUpSchema),
  signUp
);

authRoutes.post(
  '/sign-in',
  describeRoute({
    summary: 'Sign In',
    description: 'Login to account',
    responses: {
      200: {
        description: 'Logged in successfully',
        content: {
          'application/json': { schema: resolver(AuthResponseSchema) },
        },
      },
      401: {
        description: 'Invalid credentials',
        content: {
          'application/json': { schema: resolver(APIErrorSchema) },
        },
      },
      422: {
        description: 'Validation failed',
        content: {
          'application/json': { schema: resolver(APIErrorSchema.array()) },
        },
      },
    },
  }),
  customZValidator('json', SignInSchema),
  signIn
);

export default authRoutes;
