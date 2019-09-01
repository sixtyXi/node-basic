import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import loginMapper from '../mapper/login.mapper';
import Validator from '../validator';
import LoginService from '../services/login.service';

@injectable()
class LoginController {
  public constructor(
    @inject(LoginService)
    private loginService: LoginService,
    @inject(Validator)
    private validator: Validator
  ) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const login = loginMapper.fromRequest(req.body);
      await this.validator.validateDto(login);
      const token = await this.loginService.getToken(login);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
