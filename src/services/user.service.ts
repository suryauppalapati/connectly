import type { CreateUserDto, UpdateUserDto, UserIdDto, UserResponseDto } from '@/dtos/user.dto.ts';
import {
  findByEmail,
  findById,
  getAll,
  insertUser,
  removeUser,
  updateUser,
} from '@/repositories/user.repository.ts';

async function getUsers(): Promise<UserResponseDto[]> {
  const allUsers = await getAll();
  return allUsers;
}

async function getUser(userId: number): Promise<UserResponseDto | null> {
  const user = await findById(userId);
  return user;
}

async function createUser(user: CreateUserDto): Promise<UserResponseDto> {
  const isExistingUser = await findByEmail(user.email);
  if (isExistingUser) {
    throw new Error('User already exists');
  }
  const newUser = await insertUser(user);
  return newUser;
}

async function updateUserInfo(params: UpdateUserDto, id: UserIdDto): Promise<UserResponseDto> {
  const user = await findById(id);

  if (!user) {
    throw new Error('user not found');
  }
  if (params.email && params.email !== user.email) {
    const isExistingEmail = await findByEmail(params.email);
    if (isExistingEmail) {
      throw new Error('user already exists');
    }
  }
  const updatedUser = await updateUser(params, id);
  return updatedUser;
}

async function deleteUser(userId: UserIdDto): Promise<UserResponseDto> {
  const user = await findById(userId);
  if (!user) {
    throw new Error('user does not exist');
  }
  const res = await removeUser(userId);
  return res;
}

export { createUser, deleteUser, getUser, getUsers, updateUserInfo };
