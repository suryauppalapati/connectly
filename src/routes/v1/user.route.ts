import { Router } from 'express';
import { getUserById, listUsers } from '@/controllers/v1/user.controller.ts';

const userRouter = Router();

userRouter.get('/', listUsers);
userRouter.get('/:id', getUserById);

export { userRouter };
