import { injectable, inject } from 'inversify';

import Group, { GroupInfo } from '../models/group.model';
import GroupDataBaseResource from '../resources/group.db.resource';

@injectable()
class GroupService {
  private groupResource: GroupDataBaseResource;

  public constructor(@inject(GroupDataBaseResource) groupResource: GroupDataBaseResource) {
    this.groupResource = groupResource;
  }

  public getGroups(): Promise<Group[]> {
    return this.groupResource.getGroups();
  }

  public getGroupById(id: string): Promise<Group> {
    return this.groupResource.getGroupById(id);
  }

  public addGroup(groupInfo: GroupInfo): Promise<Group> {
    const group = new Group(groupInfo);

    return this.groupResource.addGroup(group);
  }

  public updateGroup(groupId: string, groupInfo: GroupInfo): Promise<Group> {
    return this.groupResource.updateGroup(groupId, groupInfo);
  }

  public deleteGroupById(id: string): Promise<void> {
    return this.groupResource.deleteGroupById(id);
  }
}

export default GroupService;
