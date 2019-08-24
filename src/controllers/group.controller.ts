import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import GroupService from '../services/group.service';
import groupMapper from '../mapper/group.mapper';
import Validator from '../validator';

@injectable()
class GroupController {
  public constructor(
    @inject(GroupService)
    private groupService: GroupService,
    @inject(Validator)
    private validator: Validator
  ) {}

  public getGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const groups = await this.groupService.getGroups();

      res.json(groups);
    } catch (error) {
      res.status(404).end();
    }
  }

  public getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.groupId;
      await this.validator.validateId(id);
      const group = await this.groupService.getGroupById(id);

      res.json(group);
    } catch (error) {
      res.status(404).end();
    }
  }

  public addGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const group = groupMapper.toDTO(req.body);
      await this.validator.validateGroup(group);
      const addedGroup = await this.groupService.addGroup(group);

      res.json(addedGroup);
    } catch (error) {
      res.status(400).end();
    }
  }

  public updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, permissions } = req.body;
      const group = groupMapper.toDTO({ id: req.params.groupId, name, permissions });
      await this.validator.validateGroup(group);
      const updatedGroup = await this.groupService.updateGroup(group);

      res.json(updatedGroup);
    } catch (error) {
      res.status(400).end();
    }
  }

  public deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.groupService.deleteGroupById(req.params.groupId);
      res.status(200).end();
    } catch (error) {
      res.status(400).end();
    }
  }
}

export default GroupController;
