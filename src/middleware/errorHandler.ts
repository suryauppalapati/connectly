import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env.ts';
import logger from '@/config/logger.ts';
import { AppError } from '@/errors/index.ts';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const isDev = env.NODE_ENV === 'development';

  if (err instanceof AppError) {
    logger.error('AppError', err);
    return res.status(err.statusCode).json({
      success: false,
      isOperational: err.isOperational,
      error: {
        message: err.message,
        code: err.code,
        details: err.details ?? [],
        ...(isDev && { stack: err.stack }),
      },
    });
  }

  logger.error('Unhandled Exception Caught', err);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    isOperational: false,
    error: {
      message: isDev ? err.message : 'Something went wrong. Please try again later.',
      code: 'INTERNAL_SERVER_ERROR',
      ...(isDev && { stack: err.stack }),
    },
  });
};
