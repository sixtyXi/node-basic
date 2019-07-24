import { Router } from 'express';

import UserController from '../controllers/user.controller';

class UserRoute {
  private BASE_URL = '/users';

  private userController: UserController;

  public router = Router();

  public constructor(userController: UserController) {
    this.userController = userController;
    this.init();
  }

  private init(): void {
    this.router
      .route(this.BASE_URL)
      .get(this.userController.getUsers)
      .post(this.userController.addUser);

    this.router
      .route(`${this.BASE_URL}/:userId`)
      .get(this.userController.getUserById)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
  }
}

export default UserRoute;
