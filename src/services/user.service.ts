import { prisma } from '@/lib/prisma.lib';

import { NotFoundException } from '@/exceptions/http.exception';

import { UserResponseSchema } from '@/schemas/user.schema';

export const userService = {
  async getUser(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotFoundException('User');
    }

    return UserResponseSchema.parse(user);
  },
};
