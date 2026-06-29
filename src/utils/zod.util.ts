import type { ZodError } from 'zod';

type ErrorDetail = {
  field: string;
  message: string;
};

function prettifyZodErrors(errorObj: ZodError): ErrorDetail[] {
  return errorObj.issues.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}

export { prettifyZodErrors };
