import { Router } from 'express';
import { injectable, inject } from 'inversify';

import middlewares from '../middlewares';
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
      .post(this.userController.addUser);

    this.router
      .route('/:userId')
      .get(this.userController.getUserById)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);

    this.router
      .route('/:userId/photo')
      .get(this.photoController.getUserPhoto)
      .post(
        middlewares.userExists,
        middlewares.uploadSingle('photo'),
        this.photoController.addUserPhoto
      );
  }
}

export default UserRouter;
