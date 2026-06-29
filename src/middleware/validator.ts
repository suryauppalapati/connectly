import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import z, { ZodError, type ZodObject } from 'zod';
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

type ValidatedRequest<S extends RequestSchemas> = Omit<Request, 'body' | 'params' | 'query'> & {
  body: InferOrDefault<S['body'], unknown>;
  params: InferOrDefault<S['params'], Record<string, string>>;
  query: InferOrDefault<S['query'], Record<string, string>>;
};

function validateRequest<S extends RequestSchemas>(schemas: S) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body, params, query } = schemas;
      if (body) request.body = await body.parseAsync(request.body);
      if (params) Object.assign(request.params, await params.parseAsync(request.params));
      if (query) Object.assign(request.query, await query.parseAsync(request.query));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          success: false,
          error: prettifyZodErrors(error),
        });
        return;
      }
      next(error);
    }
  };
}

export type { ValidatedRequest };
export { validateRequest };
