import { Router } from 'express';
import {
  addNewUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from '@/controllers/v1/user.controller.ts';
import {
  createUserBodySchema,
  deleteUserParamSchema,
  getUserParamSchema,
  updateUserBodySchema,
  updateUserParamSchema,
} from '@/dtos/user.dto.ts';
import { validateRequest } from '@/middleware/validator.ts';

const userRouter = Router();

userRouter.get('/', listUsers);
userRouter.get('/:id', validateRequest({ params: getUserParamSchema }), getUserById);
userRouter.post('/', validateRequest({ body: createUserBodySchema }), addNewUser);
userRouter.patch(
  '/:id',
  validateRequest({ params: updateUserParamSchema, body: updateUserBodySchema }),
  updateUser,
);
userRouter.delete('/:id', validateRequest({ params: deleteUserParamSchema }), deleteUser);

export { userRouter };
