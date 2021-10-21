import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

interface IPlayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  const [ , token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      '2fde6b1fa49c347588ae2cc747280ab3',
    ) as IPlayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not Exists', 401);
    }
    request.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
