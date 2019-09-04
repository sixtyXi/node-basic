import { Router } from 'express';
import { injectable, inject } from 'inversify';

import GroupController from '../controllers/group.controller';

@injectable()
class GroupRouter {
  public router = Router();

  public constructor(
    @inject(GroupController)
    private groupController: GroupController
  ) {
    this.init();
  }

  private init(): void {
    this.router
      .route('/')
      .get(this.groupController.getGroups)
      .post(this.groupController.addGroup)
      .all(this.groupController.notAllowed);

    this.router
      .route('/:groupId')
      .get(this.groupController.getGroupById)
      .put(this.groupController.updateGroup)
      .delete(this.groupController.deleteGroup)
      .all(this.groupController.notAllowed);
  }
}

export default GroupRouter;
