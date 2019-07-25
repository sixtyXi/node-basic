import { Router } from 'express';
import { injectable, inject } from 'inversify';

import GroupController from '../controllers/group.controller';

@injectable()
class GroupRouter {
  private groupController: GroupController;

  public router = Router();

  public constructor(@inject(GroupController) groupController: GroupController) {
    this.groupController = groupController;
    this.init();
  }

  private init(): void {
    this.router
      .route('/')
      .get(this.groupController.getGroups.bind(this.groupController))
      .post(this.groupController.addGroup.bind(this.groupController));

    this.router
      .route('/:groupId')
      .get(this.groupController.getGroupById.bind(this.groupController))
      .put(this.groupController.updateGroup.bind(this.groupController))
      .delete(this.groupController.deleteGroup.bind(this.groupController));
  }
}

export default GroupRouter;
