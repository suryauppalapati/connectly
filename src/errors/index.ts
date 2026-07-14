import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
  statusCode: number;
  code: string;
  details: unknown[];
  isOperational: boolean;
  constructor(message: string, statusCode: number, code: string, details: unknown[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error', details: unknown[] = []) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', details);
  }
}

class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', details: unknown[] = []) {
    super(message, StatusCodes.BAD_REQUEST, 'BAD_REQUEST', details);
  }
}

class NotFoundError extends AppError {
  constructor(message: string = 'Not Found', details: unknown[] = []) {
    super(message, StatusCodes.NOT_FOUND, 'NOT_FOUND', details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', details: unknown[] = []) {
    super(message, StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', details);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', details: unknown[] = []) {
    super(message, StatusCodes.FORBIDDEN, 'FORBIDDEN', details);
  }
}

class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists', details: unknown[] = []) {
    super(message, StatusCodes.CONFLICT, 'CONFLICT', details);
  }
}

export {
  AppError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
};
