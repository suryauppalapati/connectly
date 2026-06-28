import { eq } from 'drizzle-orm';
import { db } from '@/db/index.ts';
import { usersTable } from '@/db/schema/users.ts';

export async function getAll() {
  const users = await db.select().from(usersTable);
  return users;
}

export async function getById(userId: number) {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  return user;
}
