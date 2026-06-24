import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { env } from '@/config/env.ts';
import * as schema from '@/db/schema/index.ts';

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let pool: pg.Pool;
let db: DrizzleDb;

export const initDb = (): void => {
  try {
    pool = new pg.Pool({
      connectionString: env.DATABASE_URL,
      connectionTimeoutMillis: 5000, // fail fast after 5s
      idleTimeoutMillis: 30_000, // release idle connections after 30s
    });

    // verify connection
    pool.query('SELECT 1');

    db = drizzle({
      client: pool,
      schema,
      logger: env.NODE_ENV === 'development',
    });

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to initialise the database connection', error);
    process.exit(1);
  }
};

export const closeDb = async (): Promise<void> => {
  await pool.end();
  console.log('Database pool closed');
};

export const getDb = (): DrizzleDb => {
  if (!db) throw new Error('Database not initialized');
  return db;
};
