import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';
import pg from 'pg';
import { env } from '@/config/env.ts';
import logger from '@/config/logger.ts';
import * as schema from '@/db/schema/index.ts';

// Instantiated synchronously at startup
export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30_000,
});

export const db = drizzle({
  client: pool,
  schema,
  logger: env.NODE_ENV === 'development',
});

// Verify the connection during the server bootup
export const initDb = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    if (env.NODE_ENV === 'development') {
      await seed(db, schema, { count: 25 });
    }
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to initialise the database connection', error);
    process.exit(1);
  }
};

export const closeDb = async (): Promise<void> => {
  await pool.end();
  logger.info('Database pool closed');
};
