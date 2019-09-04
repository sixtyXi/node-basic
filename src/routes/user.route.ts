import { Router } from 'express';
import { injectable, inject } from 'inversify';

import UserController from '../controllers/user.controller';
import PhotoController from '../controllers/photo.controller';

@injectable()
class UserRouter {
  public router = Router();

  public constructor(
    @inject(UserController)
    private userController: UserController,
    @inject(PhotoController)
    private photoController: PhotoController
  ) {
    this.init();
  }

  private init(): void {
    this.router
      .route('/')
      .get(this.userController.getUsers)
      .post(this.userController.addUser)
      .all(this.userController.notAllowed);

    this.router
      .route('/:userId')
      .get(this.userController.getUserById)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser)
      .all(this.userController.notAllowed);

    this.router
      .route('/:userId/photo')
      .get(this.photoController.getUserPhoto)
      .post(this.photoController.addUserPhoto)
      .all(this.photoController.notAllowed);
  }
}

export default UserRouter;
