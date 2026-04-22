import { auth } from '@/lib/auth.lib';

import { AuthResponse, AuthResponseSchema, SignInInput, SignUpInput } from '@/schemas/auth.schema';

export const authService = {
  async signUp(formData: SignUpInput): Promise<AuthResponse> {
    const user = await auth.api.signUpEmail({
      body: {
        name: formData.username,
        email: formData.email || `${formData.username}@example.com`,
        username: formData.username,
        password: formData.password,
      },
    });

    return AuthResponseSchema.parse(user);
  },

  async signIn(formData: SignInInput): Promise<AuthResponse> {
    const user = await auth.api.signInUsername({
      body: {
        username: formData.username,
        password: formData.password,
      },
    });

    return AuthResponseSchema.parse(user);
  },
};
