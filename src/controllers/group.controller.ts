import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import GroupService from '../services/group.service';

@injectable()
class GroupController {
  private groupService: GroupService;

  public constructor(@inject(GroupService) groupService: GroupService) {
    this.groupService = groupService;
  }

  public async getGroups(req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.groupService.getGroups();
      res.json(groups);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const group = await this.groupService.getGroupById(req.params.groupId);

      res.json(group);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async addGroup(req: Request, res: Response): Promise<void> {
    try {
      const { name, permissions } = req.body;
      const addedGroup = await this.groupService.addGroup({ name, permissions });

      res.json(addedGroup);
    } catch (error) {
      res.status(400).end();
    }
  }

  public async updateGroup(req: Request, res: Response): Promise<void> {
    try {
      const { name, permissions } = req.body;
      const updatedGroup = await this.groupService.updateGroup(req.params.groupId, {
        name,
        permissions
      });

      res.json(updatedGroup);
    } catch (error) {
      res.status(400).end();
    }
  }

  public async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      await this.groupService.deleteGroupById(req.params.groupId);
      res.status(200).end();
    } catch (error) {
      res.status(400).end();
    }
  }
}

export default GroupController;
