import { injectable, inject } from 'inversify';

import UserGroupOrmRepository from '../repositories/userGroup.db.repository';
import { Permission } from '../types/permission';
import { getBitPermission } from '../helpers/getBitPermission';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';
import Group from '../models/Domain/group.domain';

@injectable()
class UserGroupService {
  public constructor(
    @inject(UserGroupOrmRepository)
    private userGroupRepository: UserGroupOrmRepository
  ) {}

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    try {
      const group = await this.userGroupRepository.addUsersToGroup(groupId, userIds);
      return group;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.addUsersToGroup.name, { groupId, userIds });
    }
  }

  public async checkUserHasPermissions(
    userId: string,
    needPermissions: Permission[]
  ): Promise<boolean> {
    const groups = await this.userGroupRepository.getGroupsByUserId(userId);

    const currentBitPermissions = groups.reduce(
      (result, group): number => result | getBitPermission(group.permissions),
      0
    );
    const needBitPermissions = getBitPermission(needPermissions);

    return needBitPermissions === (currentBitPermissions & needBitPermissions);
  }
}

export default UserGroupService;
