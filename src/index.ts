import { Hono } from 'hono';

import { errorHandler } from '@/middleware/error-handler.middleware';

import authRoutes from '@/routes/auth.route';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/auth', authRoutes);

app.onError(errorHandler);

export default {
  fetch: app.fetch,
  port: process.env['APP_PORT'] || 5000,
};
