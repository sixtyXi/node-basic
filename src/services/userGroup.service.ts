import { injectable, inject } from 'inversify';

import UserGroupDbRepository from '../repositories/userGroup.db.repository';
import { Permission } from '../types/permission';
import Group from '../models/group.domain';
import { hasAccess } from '../helpers/hasAccess';

@injectable()
class UserGroupService {
  private userGroupRepository: UserGroupDbRepository;

  public constructor(@inject(UserGroupDbRepository) userGroupRepository: UserGroupDbRepository) {
    this.userGroupRepository = userGroupRepository;
  }

  public addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    return this.userGroupRepository.addUsersToGroup(groupId, userIds);
  }

  public async checkUserHasPermissions(
    userId: string,
    permissions: Permission[]
  ): Promise<boolean> {
    const groups = await this.userGroupRepository.getGroupsByUserId(userId);
    const currentPermissions = groups.reduce(
      (arr: Permission[], group: Group): Permission[] => arr.concat(group.permissions),
      []
    );
    return hasAccess(currentPermissions, permissions);
  }
}

export default UserGroupService;
