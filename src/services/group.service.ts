import { injectable, inject } from 'inversify';

import GroupDTO from '../models/DTO/group.dto';
import GroupOrmRepository from '../repositories/group.db.repository';
import groupMapper from '../mapper/group.mapper';
import Group from '../models/Domain/group.domain';
import { catchErrors } from '../helpers/catch';
import { TYPES } from '../TYPES';

@injectable()
class GroupService {
  public constructor(
    @inject(TYPES.GroupOrmRepository)
    private groupRepository: GroupOrmRepository
  ) {}

  @catchErrors()
  public getGroups(): Promise<Group[]> {
    return this.groupRepository.getGroups();
  }

  @catchErrors()
  public getGroupById(id: string): Promise<Group | null> {
    return this.groupRepository.getGroupById(id);
  }

  @catchErrors()
  public addGroup(groupDTO: GroupDTO): Promise<Group> {
    const group = groupMapper.toDomain(groupDTO);
    return this.groupRepository.addGroup(group);
  }

  @catchErrors()
  public async updateGroup(groupDTO: GroupDTO): Promise<Group | null> {
    const group = groupMapper.toDomain(groupDTO);
    return this.groupRepository.updateGroup(group);
  }

  @catchErrors()
  public async deleteGroupById(id: string): Promise<number> {
    return this.groupRepository.deleteGroupById(id);
  }
}

export default GroupService;
