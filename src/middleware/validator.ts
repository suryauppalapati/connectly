import type { NextFunction, Request, Response } from 'express';
import z, { ZodError, type ZodObject } from 'zod';
import { BadRequestError } from '@/errors/index.ts';
import { prettifyZodErrors } from '@/utils/zod.util.ts';

// biome-ignore lint/suspicious/noExplicitAny: ZodObject generic parameters require any for broad compatibility
type AnyZodObject = ZodObject<any, any>;

interface RequestSchemas {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

type InferOrDefault<T extends AnyZodObject | undefined, Default> = T extends AnyZodObject
  ? z.infer<T>
  : Default;

type TypedData<S extends RequestSchemas> = {
  body: InferOrDefault<S['body'], unknown>;
  params: InferOrDefault<S['params'], Record<string, string>>;
  query: InferOrDefault<S['query'], Record<string, string>>;
};

/**
 * Casts an Express request to its Zod-validated shape.
 * Call this in controllers after `validateRequest` middleware has run.
 *
 * @example
 * const { body, params } = typedRequest<{ body: typeof createUserBodySchema }>(req);
 */
function typedRequest<S extends RequestSchemas>(req: Request): TypedData<S> {
  return req as unknown as TypedData<S>;
}

function validateRequest<S extends RequestSchemas>(schemas: S) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    try {
      const { body, params, query } = schemas;
      if (body) request.body = await body.parseAsync(request.body);
      if (params) Object.assign(request.params, await params.parseAsync(request.params));
      if (query) Object.assign(request.query, await query.parseAsync(request.query));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new BadRequestError('Validation failed', prettifyZodErrors(error)));
        return;
      }
      next(error);
    }
  };
}

export type { TypedData };
export { typedRequest, validateRequest };
