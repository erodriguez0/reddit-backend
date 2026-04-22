import { Scalar } from '@scalar/hono-api-reference';
import { Hono } from 'hono';
import { openAPIRouteHandler } from 'hono-openapi';

import { errorHandler } from '@/middleware/error-handler.middleware';

import authRoutes from '@/routes/auth.route';
import userRoutes from '@/routes/user.route';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get(
  '/openapi',
  openAPIRouteHandler(app, {
    documentation: {
      info: {
        title: 'Reddit API',
        version: '1.0.0',
        description: 'Reddit API',
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Local server',
        },
      ],
    },
  })
);

app.get('/docs', Scalar({ theme: 'default', url: '/api/openapi' }));

app.route('/auth', authRoutes);
app.route('/user', userRoutes);

app.onError(errorHandler);

export default {
  fetch: app.fetch,
  port: process.env['APP_PORT'] || 5000,
};
