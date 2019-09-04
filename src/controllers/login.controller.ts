import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import loginMapper from '../mapper/login.mapper';
import Validator from '../validator';
import LoginService from '../services/login.service';
import Controller from '../types/Controller';

@injectable()
class LoginController extends Controller {
  public constructor(
    @inject(LoginService)
    private loginService: LoginService,
    @inject(Validator)
    private validator: Validator
  ) {
    super();
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const login = loginMapper.fromRequest(req.body);
      await this.validator.validateDto(login);
      const token = await LoginService.getToken(login);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
