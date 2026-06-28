import { getAll, getById } from '@/repositories/user.repository.ts';
import type { User } from '@/types/user.type.ts';

export async function getUsers(): Promise<User[]> {
  const allUsers = await getAll();
  return allUsers;
}

export async function getUser(userId: number): Promise<User | null> {
  const user = await getById(userId);
  return user[0] || null;
}
