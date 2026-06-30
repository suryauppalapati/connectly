import { eq } from 'drizzle-orm';
import { db } from '@/db/index.ts';
import { usersTable } from '@/db/schema/users.ts';
import type { CreateUserDto, UpdateUserDto, UserEmailDto, UserIdDto } from '@/dtos/user.dto.ts';
import type { UserEntity } from '@/types/user.type.ts';

async function getAll(): Promise<UserEntity[]> {
  const users = await db.select().from(usersTable);
  return users;
}

async function findById(userId: UserIdDto): Promise<UserEntity | null> {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  return user || null;
}

async function findByEmail(userEmailId: UserEmailDto): Promise<UserEntity | null> {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, userEmailId));
  return user || null;
}

async function insertUser(user: CreateUserDto): Promise<UserEntity> {
  const [newUser] = await db.insert(usersTable).values(user).returning();
  return newUser;
}

async function updateUser(updates: UpdateUserDto, id: UserIdDto): Promise<UserEntity> {
  const [response] = await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, id))
    .returning();
  return response;
}

async function removeUser(userId: UserIdDto): Promise<UserEntity> {
  const [response] = await db.delete(usersTable).where(eq(usersTable.id, userId)).returning();
  return response;
}

export { findByEmail, findById, getAll, insertUser, removeUser, updateUser };
