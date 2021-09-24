import { UsersRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'


interface IPlayload{
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing!')
  }

  const [, token] = authHeader.split("");

  try {
    const {sub: user_id} = verify(token, "2fde6b1fa49c347588ae2cc747280ab3") as IPlayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id)

    if(!user){
      throw new Error('User does not Exists');
    }

    next();
  } catch (error) {
    throw new Error("Invalid token!")
  }
}
