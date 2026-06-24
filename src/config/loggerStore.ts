import { AsyncLocalStorage } from 'node:async_hooks';

export interface LoggerStore {
  corelationId: string;
}

export const loggerStore = new AsyncLocalStorage<LoggerStore>();
