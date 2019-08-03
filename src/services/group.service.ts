import { injectable, inject } from 'inversify';

import GroupDTO from '../models/group.dto.model';
import GroupDbRepository from '../repositories/group.db.repository';
import groupMapper from '../mapper/group.mapper';

@injectable()
class GroupService {
  private groupRepository: GroupDbRepository;

  public constructor(@inject(GroupDbRepository) groupRepository: GroupDbRepository) {
    this.groupRepository = groupRepository;
  }

  public async getGroups(): Promise<GroupDTO[]> {
    const groups = await this.groupRepository.getGroups();

    return groups.map(groupMapper.toDTO);
  }

  public async getGroupById(id: string): Promise<GroupDTO> {
    const group = await this.groupRepository.getGroupById(id);

    return groupMapper.toDTO(group);
  }

  public async addGroup(groupDTO: GroupDTO): Promise<GroupDTO> {
    const group = groupMapper.toDomain(groupDTO);
    const addedGroup = await this.groupRepository.addGroup(group);

    return groupMapper.toDTO(addedGroup);
  }

  public async updateGroup(groupDTO: GroupDTO): Promise<GroupDTO> {
    const group = groupMapper.toDomain(groupDTO);
    const updatedGroup = await this.groupRepository.updateGroup(group);

    return groupMapper.toDTO(updatedGroup);
  }

  public deleteGroupById(id: string): Promise<void> {
    return this.groupRepository.deleteGroupById(id);
  }
}

export default GroupService;
