import { Router } from 'express';
import { injectable, inject } from 'inversify';

import GroupRouter from './group.route';
import UserRouter from './user.route';

@injectable()
class RootRouter {
  public router = Router();

  public constructor(
    @inject(UserRouter) userRouter: UserRouter,
    @inject(GroupRouter) groupRouter: GroupRouter
  ) {
    this.router.use('/users', userRouter.router);
    this.router.use('/groups', groupRouter.router);
  }
}

export default RootRouter;
