import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import GroupService from '../services/group.service';
import groupMapper from '../mapper/group.mapper';
import Validator from '../validator';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';

@injectable()
class GroupController {
  public constructor(
    @inject(GroupService)
    private groupService: GroupService,
    @inject(Validator)
    private validator: Validator
  ) {}

  public getGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groups = await this.groupService.getGroups();
      const groupDtos = groups.map(groupMapper.toDTO);

      res.json(groupDtos);
    } catch (error) {
      next(error);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.groupId;
      await this.validator.validateId(id);
      const group = await this.groupService.getGroupById(id);

      if (group) {
        const groupDto = groupMapper.toDTO(group);
        res.json(groupDto);
      } else {
        throw new CustomError(ErrorType.NotFound, this.getGroupById.name, { id });
      }
    } catch (error) {
      next(error);
    }
  };

  public addGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const group = groupMapper.toDTO(req.body);
      await this.validator.validateDto(group);
      const addedGroup = await this.groupService.addGroup(group);
      const groupDto = groupMapper.toDTO(addedGroup);

      res.json(groupDto);
    } catch (error) {
      next(error);
    }
  };

  public updateGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, permissions } = req.body;
      const id = req.params.groupId;
      const group = groupMapper.toDTO({ id, name, permissions });
      await this.validator.validateDto(group);
      const updatedGroup = await this.groupService.updateGroup(group);

      if (updatedGroup) {
        const updatedGroupDto = groupMapper.toDTO(updatedGroup);
        res.json(updatedGroupDto);
      } else {
        throw new CustomError(ErrorType.NotFound, this.updateGroup.name, { id, name, permissions });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.groupId;
      await this.validator.validateId(id);
      const deletedGroupsQty = await this.groupService.deleteGroupById(id);

      if (deletedGroupsQty) {
        res.status(200).end();
      } else {
        throw new CustomError(ErrorType.NotFound, this.deleteGroup.name, { id });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default GroupController;
