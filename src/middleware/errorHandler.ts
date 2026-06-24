import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env.ts';
import logger from '../config/logger.ts';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled Exception Caught', err);

  const isDev = env.NODE_ENV === 'development';

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
    message: isDev ? err.message : undefined,
  });
};
