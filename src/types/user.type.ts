import type { usersTable } from '@/db/schema/users.ts';

type User = typeof usersTable.$inferSelect;

type NewUser = typeof usersTable.$inferSelect;

export type { NewUser, User };
