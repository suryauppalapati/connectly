import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '@/config/logger.ts';
import { loggerStore } from '@/config/loggerStore.ts';

const getLogLevel = (statusCode: number) => {
  if (statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return 'error';
  if (statusCode >= StatusCodes.BAD_REQUEST) return 'warn';
  return 'info';
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-request-id'] as string) || crypto.randomUUID();
  res.setHeader('X-Correlation-Id', correlationId);

  const startTime = performance.now();

  loggerStore.run({ correlationId }, () => {
    logger.info('Incoming Request', {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });

    res.on('finish', () => {
      const durationMs = Math.round(performance.now() - startTime);
      const level = getLogLevel(res.statusCode);

      logger.log(level, 'Outgoing Response', {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs,
        correlationId,
      });
    });

    next();
  });
};
