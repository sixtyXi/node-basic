import { injectable, inject } from 'inversify';

import UserGroupOrmRepository from '../repositories/userGroup.db.repository';
import { Permission } from '../types/permission';
import { getBitPermission } from '../helpers/getBitPermission';

@injectable()
class UserGroupService {
  public constructor(
    @inject(UserGroupOrmRepository)
    private userGroupRepository: UserGroupOrmRepository
  ) {}

  public addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    return this.userGroupRepository.addUsersToGroup(groupId, userIds);
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
