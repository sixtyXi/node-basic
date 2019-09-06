import { Router } from 'express';
import { injectable, inject } from 'inversify';

import LoginController from '../controllers/login.controller';
import { TYPES } from '../TYPES';

@injectable()
class UserRouter {
  public router = Router();

  public constructor(
    @inject(TYPES.LoginController)
    private loginController: LoginController
  ) {
    this.init();
  }

  private init(): void {
    this.router
      .route('/')
      .post(this.loginController.login)
      .all(this.loginController.notAllowed);
  }
}

export default UserRouter;
