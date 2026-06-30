import type { usersTable } from '@/db/schema/users.ts';

export type UserEntity = typeof usersTable.$inferSelect;
