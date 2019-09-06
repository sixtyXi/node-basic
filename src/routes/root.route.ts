import { Router } from 'express';
import { injectable, inject } from 'inversify';

import GroupRouter from './group.route';
import UserRouter from './user.route';
import LoginRouter from './login.route';
import { ErrorType } from '../enums/errorTypes';
import HttpError from '../types/HttpError';
import { TYPES } from '../TYPES';

@injectable()
class RootRouter {
  public router = Router();

  public constructor(
    @inject(TYPES.UserRouter) userRouter: UserRouter,
    @inject(TYPES.GroupRouter) groupRouter: GroupRouter,
    @inject(TYPES.LoginRouter) loginRouter: LoginRouter
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
