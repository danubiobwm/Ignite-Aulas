import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {injectable, inject} from 'tsyringe'
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse{
  user:{
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({ email, password }:IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('Email or password incorrect!', 401)
    }

    const passwordMatch = await compare(password, user.password);

    // Senha esta carreta
    if(!passwordMatch){
      throw new AppError('Email or password incorrect!',401)
    }

    //Gerar jsonwebtoken

    const token = sign({}, "2fde6b1fa49c347588ae2cc747280ab3", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn:IResponse={
      token,
      user:{ name: user.name, email: user.email}
    }

    return tokenReturn;

   }
}



export { AuthenticateUserUseCase }
