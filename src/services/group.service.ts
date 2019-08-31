import { injectable, inject } from 'inversify';

import GroupDTO from '../models/DTO/group.dto';
import GroupOrmRepository from '../repositories/group.db.repository';
import groupMapper from '../mapper/group.mapper';
import Group from '../models/Domain/group.domain';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';

@injectable()
class GroupService {
  public constructor(
    @inject(GroupOrmRepository)
    private groupRepository: GroupOrmRepository
  ) {}

  public async getGroups(): Promise<Group[]> {
    try {
      const groups = await this.groupRepository.getGroups();
      return groups;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.getGroups.name, {});
    }
  }

  public async getGroupById(id: string): Promise<Group | null> {
    try {
      const group = await this.groupRepository.getGroupById(id);
      return group;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.getGroupById.name, { id });
    }
  }

  public async addGroup(groupDTO: GroupDTO): Promise<Group> {
    try {
      const group = groupMapper.toDomain(groupDTO);
      const addedGroup = await this.groupRepository.addGroup(group);
      return addedGroup;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.addGroup.name, { groupDTO });
    }
  }

  public async updateGroup(groupDTO: GroupDTO): Promise<Group | null> {
    try {
      const group = groupMapper.toDomain(groupDTO);
      const updatedGroup = await this.groupRepository.updateGroup(group);
      return updatedGroup;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.updateGroup.name, { groupDTO });
    }
  }

  public async deleteGroupById(id: string): Promise<number> {
    try {
      const deletedRows = await this.groupRepository.deleteGroupById(id);
      return deletedRows;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.deleteGroupById.name, { id });
    }
  }
}

export default GroupService;
