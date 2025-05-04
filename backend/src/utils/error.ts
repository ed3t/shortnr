import { AppError } from '@app/types/error';

export const createError = (status: number, message: string): AppError => {
  const err = new Error(message) as AppError;
  err.status = status;
  err.message = message;
  return err;
};
