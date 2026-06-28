import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUser, getUsers } from '@/services/user.service.ts';

const listUsers = async (_req: Request, res: Response) => {
  const users = await getUsers();
  res.status(StatusCodes.OK).send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = await getUser(userId);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send({ error: 'User not found' });
    return;
  }
  res.status(StatusCodes.OK).send(user);
};

export { getUserById, listUsers };
