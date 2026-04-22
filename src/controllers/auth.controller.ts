import { Context } from 'hono';

import { authService } from '@/services/auth.service';

export const signUp = async (c: Context) => {
  const data = await c.req.json();
  const user = await authService.signUp(data);
  return c.json(user, 201);
};

export const signIn = async (c: Context) => {
  const data = await c.req.json();
  const user = await authService.signIn(data);
  return c.json(user, 200);
};
