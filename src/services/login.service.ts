import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import LoginDTO from '../models/DTO/login.dto';
import { catchErrors } from '../helpers/decorators/catchErrors';

@injectable()
class LoginService {
  @catchErrors()
  public static async getToken(login: LoginDTO): Promise<string> {
    const { name, password } = login;
    const secret = process.env.SECRET || 'secret';

    return jwt.sign({ name, password }, secret, { expiresIn: 60 });
  }
}

export default LoginService;
