import { Router } from 'express';
import { injectable, inject } from 'inversify';

import UserController from '../controllers/user.controller';

@injectable()
class UserRouter {
  public router = Router();

  public constructor(
    @inject(UserController)
    private userController: UserController
  ) {
    this.init();
  }

  private init(): void {
    this.router
      .route('/')
      .get(this.userController.getUsers.bind(this.userController))
      .post(this.userController.addUser.bind(this.userController));

    this.router
      .route('/:userId')
      .get(this.userController.getUserById.bind(this.userController))
      .put(this.userController.updateUser.bind(this.userController))
      .delete(this.userController.deleteUser.bind(this.userController));
  }
}

export default UserRouter;
