import { Router } from 'express';
import { injectable, inject } from 'inversify';

import GroupRouter from './group.route';
import UserRouter from './user.route';
import LoginRouter from './login.route';
import { ErrorType } from '../enums/errorTypes';
import HttpError from '../types/HttpError';

@injectable()
class RootRouter {
  public router = Router();

  public constructor(
    @inject(UserRouter) userRouter: UserRouter,
    @inject(GroupRouter) groupRouter: GroupRouter,
    @inject(LoginRouter) loginRouter: LoginRouter
  ) {
    this.router.use('/users', userRouter.router);
    this.router.use('/groups', groupRouter.router);
    this.router.use('/login', loginRouter.router);
    this.router.route('*').all((req, res, next): void => {
      next(new HttpError(ErrorType.Teapot, 'Not implemented'));
    });
  }
}

export default RootRouter;
