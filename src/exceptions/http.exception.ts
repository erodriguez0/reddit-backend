import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { z } from 'zod';

import { APIError } from '@/schemas/error.schema';

export class APIException extends HTTPException {
  public errors?: APIError[];

  constructor(
    status: ContentfulStatusCode,
    options?: { message: string; errors?: APIError[]; cause?: unknown }
  ) {
    super(status, { message: options?.message, cause: options?.cause });
    this.errors = options?.errors;
  }

  // Helper to map Zod issues to APIError
  static fromZodErrors(errors: z.core.$ZodIssue[]) {
    const details: APIError[] = errors.map((issue) => ({
      // Join path (e.g., user.address.zip)
      field: issue.path.join('.') || 'root',
      message: issue.message,
      // Use standard Zod issue code
      code: issue.code.toUpperCase(),
    }));

    return new APIException(422, { message: 'Validation failed', errors: details });
  }
}
