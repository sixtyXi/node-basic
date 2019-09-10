import { Response } from 'express';
import { injectable, inject } from 'inversify';

import GroupService from '../services/group.service';
import groupMapper from '../mapper/group.mapper';
import Validator from '../validator';
import ApplicationError from '../types/ApplicationError';
import { ErrorStatus } from '../enums/errorTypes';
import Controller from '../types/Controller';
import { TYPES } from '../TYPES';
import { handleErrors } from '../helpers/decorators/handleErrors';
import { AuthRequest } from '../interfaces/AuthRequest';

@injectable()
class GroupController extends Controller {
  public constructor(
    @inject(TYPES.GroupService)
    private groupService: GroupService,
    @inject(TYPES.Validator)
    private validator: Validator
  ) {
    super();
  }

  @handleErrors()
  public getGroups = async (req: AuthRequest, res: Response): Promise<void> => {
    const groups = await this.groupService.getGroups();
    const groupDtos = groups.map(groupMapper.toDTO);

    res.json(groupDtos);
  };

  @handleErrors()
  public getGroupById = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.groupId;
    await this.validator.validateId(id);
    const group = await this.groupService.getGroupById(id);

    if (group) {
      const groupDto = groupMapper.toDTO(group);
      res.json(groupDto);
    } else {
      throw new ApplicationError(ErrorStatus.NotFound, this.getGroupById.name, { id });
    }
  };

  @handleErrors()
  public addGroup = async (req: AuthRequest, res: Response): Promise<void> => {
    const group = groupMapper.toDTO(req.body);
    await this.validator.validateDto(group);
    const addedGroup = await this.groupService.addGroup(group);
    const groupDto = groupMapper.toDTO(addedGroup);

    res.json(groupDto);
  };

  @handleErrors()
  public updateGroup = async (req: AuthRequest, res: Response): Promise<void> => {
    const { name, permissions } = req.body;
    const id = req.params.groupId;
    const group = groupMapper.toDTO({ id, name, permissions });
    await this.validator.validateDto(group);
    const updatedGroup = await this.groupService.updateGroup(group);

    if (updatedGroup) {
      const updatedGroupDto = groupMapper.toDTO(updatedGroup);
      res.json(updatedGroupDto);
    } else {
      throw new ApplicationError(ErrorStatus.NotFound, this.updateGroup.name, {
        id,
        name,
        permissions
      });
    }
  };

  @handleErrors()
  public deleteGroup = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.groupId;
    await this.validator.validateId(id);
    const deletedGroupsQty = await this.groupService.deleteGroupById(id);

    if (deletedGroupsQty) {
      res.status(204).end();
    } else {
      throw new ApplicationError(ErrorStatus.NotFound, this.deleteGroup.name, { id });
    }
  };
}

export default GroupController;
