import { Response } from 'express';
import { injectable, inject } from 'inversify';

import loginMapper from '../mapper/login.mapper';
import Validator from '../validator';
import LoginService from '../services/login.service';
import Controller from '../types/Controller';
import { TYPES } from '../TYPES';
import { handleErrors } from '../helpers/decorators/handleErrors';
import { AuthRequest } from '../interfaces/AuthRequest';

@injectable()
class LoginController extends Controller {
  public constructor(
    @inject(TYPES.LoginService)
    private loginService: LoginService,
    @inject(TYPES.Validator)
    private validator: Validator
  ) {
    super();
  }

  @handleErrors()
  public login = async (req: AuthRequest, res: Response): Promise<void> => {
    const login = loginMapper.fromRequest(req.body);
    await this.validator.validateDto(login);
    const token = await this.loginService.getToken(login);

    res.json({ token });
  };
}

export default LoginController;
