import { createMiddleware } from 'hono/factory';

import { auth } from '@/lib/auth.lib';

import { APIException } from '@/exceptions/http.exception';

export const authMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    throw new APIException(403, { message: 'Unauthorized' });
  }

  c.set('user', session.user);
  c.set('session', session.session);

  await next();
});
