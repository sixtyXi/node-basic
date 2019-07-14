import { Router } from 'express';

import userController from '../controllers/user.controller';

const BASE_URL = '/users';
const router = Router();

router
  .route(BASE_URL)
  .get(userController.getUsers)
  .post(userController.addUser);

router
  .route(`${BASE_URL}/:userId`)
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
