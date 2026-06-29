import { usersTable } from '@/db/schema/users.ts';

const userEntity = usersTable.$inferSelect;

type UserEntity = typeof userEntity;

export type { UserEntity };
