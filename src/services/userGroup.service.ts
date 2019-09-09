import { injectable, inject } from 'inversify';

import UserGroupOrmRepository from '../repositories/userGroup.db.repository';
import { Permission } from '../types/permission';
import { getBitPermission } from '../helpers/getBitPermission';
import Group from '../models/Domain/group.domain';
import { catchErrors } from '../helpers/catchErrors';
import { TYPES } from '../TYPES';

@injectable()
class UserGroupService {
  public constructor(
    @inject(TYPES.UserGroupOrmRepository)
    private userGroupRepository: UserGroupOrmRepository
  ) {}

  @catchErrors()
  public addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    return this.userGroupRepository.addUsersToGroup(groupId, userIds);
  }

  @catchErrors()
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
