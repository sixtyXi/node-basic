import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';
import LoginDTO from '../models/DTO/login.dto';

@injectable()
class LoginService {
  public async getToken(login: LoginDTO): Promise<string> {
    try {
      const { name, password } = login;
      return jwt.sign({ name, password }, 'secret', { expiresIn: 60 });
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.getToken.name, { login });
    }
  }
}

export default LoginService;
