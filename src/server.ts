import app from './app.ts';
import { env } from './config/env.ts';
import logger from './config/logger.ts';
import { closeDb, initDb } from './db/index.ts';

initDb();

const server = app.listen(env.PORT, () => {
  logger.info(`Server up and running at port: ${env.PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down gracefully`);
  server.close(async () => {
    await closeDb();
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
