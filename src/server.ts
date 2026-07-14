import app from './app.ts';
import { env } from './config/env.ts';
import logger from './config/logger.ts';
import { closeDb, initDb } from './db/index.ts';

await initDb();

const server = app.listen(env.PORT, () => {
  logger.info(`Server up and running at port: ${env.PORT}`);
});

const shutdown = (reason: string, exitCode = 0) => {
  logger.info(`${reason} received, shutting down gracefully`);

  server.close(async () => {
    try {
      await closeDb();
      logger.info('HTTP server closed');
      process.exit(exitCode);
    } catch (err) {
      logger.error('Error during shutdown', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM', 0));

process.on('SIGINT', () => shutdown('SIGINT', 0));

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
  shutdown('uncaughtException', 1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', reason);
  shutdown('unhandledRejection', 1);
});
