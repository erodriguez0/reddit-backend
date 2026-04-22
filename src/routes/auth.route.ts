import { Hono } from 'hono';

import { customZValidator } from '@/lib/validator';

import { SignInSchema, SignUpSchema } from '@/schemas/auth.schema';

import { signIn, signUp } from '@/controllers/auth.controller';

const authRoutes = new Hono();

authRoutes.post('/sign-up', customZValidator('json', SignUpSchema), signUp);

authRoutes.post('/sign-in', customZValidator('json', SignInSchema), signIn);

export default authRoutes;
