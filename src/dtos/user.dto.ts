// src/dtos/user.dto.ts
import z from 'zod';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;

const userIdSchema = z.coerce.number().positive('ID must be a positive integer');

const userEmailSchema = z.email('Please provide a valid email address').trim();

const userNameSchema = z
  .string()
  .min(MIN_NAME_LENGTH, 'Name must be at least 2 characters long')
  .max(MAX_NAME_LENGTH, 'Name must be at most 50 characters long')
  .trim();

const createUserBodySchema = z.object({
  name: userNameSchema,
  email: userEmailSchema,
});

const updateUserBodySchema = createUserBodySchema
  .partial()
  .refine(
    (data) => data.name !== undefined || data.email !== undefined,
    'At least one field must be provided',
  );

const updateUserParamSchema = z.object({ id: userIdSchema });
const deleteUserParamSchema = z.object({ id: userIdSchema });
const getUserParamSchema = z.object({ id: userIdSchema });

const userResponseSchema = z.object({
  id: userIdSchema,
  name: userNameSchema,
  email: userEmailSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Inferred Types
type UserIdDto = z.infer<typeof userIdSchema>;
type UserEmailDto = z.infer<typeof userEmailSchema>;
type CreateUserDto = z.infer<typeof createUserBodySchema>;
type UpdateUserDto = z.infer<typeof updateUserBodySchema>;
type UpdateUserParamDto = z.infer<typeof updateUserParamSchema>;
type DeleteUserParamDto = z.infer<typeof deleteUserParamSchema>;
type GetUserParamDto = z.infer<typeof getUserParamSchema>;
type UserResponseDto = z.infer<typeof userResponseSchema>;

export type {
  CreateUserDto,
  DeleteUserParamDto,
  GetUserParamDto,
  UpdateUserDto,
  UpdateUserParamDto,
  UserEmailDto,
  UserIdDto,
  UserResponseDto,
};
export {
  createUserBodySchema,
  deleteUserParamSchema,
  getUserParamSchema,
  updateUserBodySchema,
  updateUserParamSchema,
  userEmailSchema,
  userIdSchema,
  userResponseSchema,
};
