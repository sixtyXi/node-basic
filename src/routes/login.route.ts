import { Router } from 'express';
import { injectable, inject } from 'inversify';

import LoginController from '../controllers/login.controller';

@injectable()
class UserRouter {
  public router = Router();

  public constructor(
    @inject(LoginController)
    private loginController: LoginController
  ) {
    this.init();
  }

  private init(): void {
    this.router.route('/').post(this.loginController.login);
  }
}

export default UserRouter;
