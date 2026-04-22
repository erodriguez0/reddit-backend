import { z } from '@hono/zod-openapi';

export const SignUpSchema = z
  .object({
    email: z.email({ error: 'Invalid email address' }).nullish(),
    username: z
      .string()
      .min(3, { error: 'Username must be at least 3 characters' })
      .max(20, { error: 'Username must be at most 20 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, { error: 'Username can only be letters, number, and underscores' }),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ['confirm'],
  });

export const SignInSchema = z.object({
  username: z
    .string()
    .min(3, { error: 'Username must be at least 3 characters' })
    .max(20, { error: 'Username must be at most 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { error: 'Username can only be letters, number, and underscores' }),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    username: z.string(),
    displayUsername: z.string(),
    image: z.url({ error: 'Invalid image URL' }).nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
