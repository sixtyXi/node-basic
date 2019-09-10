import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';

import LoginDTO from '../models/DTO/login.dto';
import { catchErrors } from '../helpers/decorators/catchErrors';
import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import { TYPES } from '../TYPES';
import { ErrorStatus } from '../enums/errorTypes';
import HttpError from '../types/HttpError';

@injectable()
class LoginService {
  public constructor(
    @inject(TYPES.UserRepositoryContract)
    private userRepository: UserRepositoryContract
  ) {}

  @catchErrors()
  public async getToken(login: LoginDTO): Promise<string> {
    const user = await this.userRepository.getUserToLogin(login);

    if (!user) {
      throw new HttpError(ErrorStatus.Unauthorized, 'Authorization error');
    }

    const { name, password } = login;
    const secret = process.env.SECRET || 'secret';

    return jwt.sign({ name, password }, secret, { expiresIn: 60 });
  }
}

export default LoginService;
