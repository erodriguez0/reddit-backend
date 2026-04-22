import { Context } from 'hono';

import { APIException, BadRequestException } from '@/exceptions/http.exception';

import { GetUserParams, GetUserParamsSchema } from '@/schemas/user.schema';

import { userService } from '@/services/user.service';

export const getUserByUsername = async (
  c: Context<any, any, { out: { param: GetUserParams } }>
) => {
  const { username } = c.req.valid('param');
  const user = await userService.getUser(username);
  return c.json(user, 200);
};
