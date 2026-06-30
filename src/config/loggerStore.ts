import { AsyncLocalStorage } from 'node:async_hooks';

export interface LoggerStore {
  correlationId: string;
}

export const loggerStore = new AsyncLocalStorage<LoggerStore>();
