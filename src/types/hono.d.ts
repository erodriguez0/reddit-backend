import { AuthType } from '@/lib/auth';

declare module 'hono' {
  interface ContextVariableMap extends AuthType {}
}
