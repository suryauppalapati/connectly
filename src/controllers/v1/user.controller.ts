import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type {
  createUserBodySchema,
  deleteUserParamSchema,
  getUserParamSchema,
  updateUserBodySchema,
  updateUserParamSchema,
} from '@/dtos/user.dto.ts';
import { typedRequest } from '@/middleware/validator.ts';
import {
  createUser,
  deleteUser as deleteUserService,
  getUser,
  getUsers,
  updateUserInfo,
} from '@/services/user.service.ts';

const addNewUser = async (req: Request, res: Response) => {
  const { body } = typedRequest<{ body: typeof createUserBodySchema }>(req);
  const user = await createUser(body);
  res.status(StatusCodes.CREATED).send(user);
};

const listUsers = async (_req: Request, res: Response) => {
  const users = await getUsers();
  res.status(StatusCodes.OK).send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const { params } = typedRequest<{ params: typeof getUserParamSchema }>(req);
  const user = await getUser(params.id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send({ error: 'User not found' });
    return;
  }
  res.status(StatusCodes.OK).send(user);
};

const updateUser = async (req: Request, res: Response) => {
  const { params, body } = typedRequest<{
    body: typeof updateUserBodySchema;
    params: typeof updateUserParamSchema;
  }>(req);
  const updatedUser = await updateUserInfo(body, params.id);
  res.status(StatusCodes.OK).send(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
  const { params } = typedRequest<{ params: typeof deleteUserParamSchema }>(req);
  const user = await deleteUserService(params.id);
  res.status(StatusCodes.OK).send(user);
};

export { addNewUser, deleteUser, getUserById, listUsers, updateUser };
