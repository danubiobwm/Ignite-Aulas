import { NextFunction, Response, Request } from 'express';
import { UsersRepository } from '@modules/accounts/infra/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {id} = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if(!user.isAdmin){
    throw new AppError("User isn´t Admin!", 404);
  }
  return next();
}
