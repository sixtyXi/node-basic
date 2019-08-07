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
      .get(this.userController.getUsers)
      .post(this.userController.addUser);

    this.router
      .route('/:userId')
      .get(this.userController.getUserById)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
  }
}

export default UserRouter;
