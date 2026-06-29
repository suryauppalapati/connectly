import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type {
  createUserBodySchema,
  deleteUserParamSchema,
  getUserParamSchema,
  updateUserBodySchema,
  updateUserParamSchema,
} from '@/dtos/user.dto.ts';
import type { ValidatedRequest } from '@/middleware/validator.ts';
import {
  createUser,
  deleteUser as deleteUserService,
  getUser,
  getUsers,
  updateUserInfo,
} from '@/services/user.service.ts';

const addNewUser = async (
  req: ValidatedRequest<{ body: typeof createUserBodySchema }>,
  res: Response,
) => {
  const payload = req.body;
  const user = await createUser(payload);
  res.status(StatusCodes.CREATED).send(user);
};

const listUsers = async (_req: Request, res: Response) => {
  const users = await getUsers();
  res.status(StatusCodes.OK).send(users);
};

const getUserById = async (
  req: ValidatedRequest<{ params: typeof getUserParamSchema }>,
  res: Response,
) => {
  const user = await getUser(req.params.id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send({ error: 'User not found' });
    return;
  }
  res.status(StatusCodes.OK).send(user);
};

const updateUser = async (
  req: ValidatedRequest<{
    body: typeof updateUserBodySchema;
    params: typeof updateUserParamSchema;
  }>,
  res: Response,
) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedUser = await updateUserInfo(updates, id);
  res.status(StatusCodes.OK).send(updatedUser);
};

const deleteUser = async (
  req: ValidatedRequest<{ params: typeof deleteUserParamSchema }>,
  res: Response,
) => {
  const userId = req.params.id;
  const user = await deleteUserService(userId);
  res.status(StatusCodes.OK).send(user);
};

export { addNewUser, deleteUser, getUserById, listUsers, updateUser };
