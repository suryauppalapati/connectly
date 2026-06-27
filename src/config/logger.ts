import winston from 'winston';
import { env } from './env.ts';
import { loggerStore } from './loggerStore.ts';

const { combine, timestamp, json, colorize, printf, errors } = winston.format;

// Extract reqId from AsyncLocalStorage and inject it into the log
const injectCorelationId = winston.format((info) => {
  const store = loggerStore.getStore();
  if (store?.corelationId) {
    info.correlationId = store.corelationId;
  }
  return info;
});

const devFormat = combine(
  injectCorelationId(),
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack, correlationId, ...meta }) => {
    const metadata = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    const id = correlationId ? ` [${correlationId}]` : '';
    return `[${timestamp}] ${level}:${id} ${message}${metadata}`;
  }),
);

// Prod format: Structured JSON, stack traces, corelationId
const prodFormat = combine(injectCorelationId(), timestamp(), errors({ stack: true }), json());

const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: env.NODE_ENV === 'development' ? devFormat : prodFormat,
  transports: [new winston.transports.Console()],
  defaultMeta: {
    env: env.NODE_ENV,
    pid: process.pid,
  },
});

export default logger;
