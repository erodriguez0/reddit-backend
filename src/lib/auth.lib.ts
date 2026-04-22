import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { isAPIError } from 'better-auth/api';
import { bearer, username } from 'better-auth/plugins';
import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';

import { prisma } from '@/lib/prisma.lib';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: true,
        input: true,
        unique: true,
      },
    },
  },
  experimental: {
    joins: true,
  },
  advanced: {
    database: {
      generateId: false,
    },
    disableOriginCheck: true,
  },
  plugins: [bearer(), username()],
  trustedOrigins: ['http://localhost:5000'],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
