import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../config/logger.ts';
import { loggerStore } from '../config/loggerStore.ts';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const corelationId = (req.headers['x-request-id'] as string) || crypto.randomUUID();
  res.setHeader('X-Correlation-Id', corelationId);

  const startTime = performance.now();

  loggerStore.run({ corelationId }, () => {
    logger.info('Incoming Request', {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });

    res.on('finish', () => {
      const durationMs = Math.round(performance.now() - startTime);
      const level =
        res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR
          ? 'error'
          : res.statusCode >= StatusCodes.BAD_REQUEST
            ? 'warn'
            : 'info';

      logger.log(level, 'Outgoing Response', {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs,
      });
    });

    next();
  });
};
