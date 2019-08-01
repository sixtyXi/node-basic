import { injectable, inject } from 'inversify';

import Group, { GroupInfo } from '../models/group.model';
import { GroupDBModel } from '../db/models/group.db.model';
import DbClient, { DbClientProvider } from '../db/dbClient';

@injectable()
class GroupDataBaseResource {
  private dbProvider: DbClientProvider;

  private db: DbClient | null;

  public constructor(@inject('DbClientProvider') provider: DbClientProvider) {
    this.dbProvider = provider;
    this.db = null;
  }

  public async getGroups(): Promise<Group[]> {
    const groupsTable = await this.getGroupsTable();
    return groupsTable.findAll();
  }

  public async getGroupById(id: string): Promise<Group> {
    const groupsTable = await this.getGroupsTable();
    return groupsTable.findByPk(id, { rejectOnEmpty: true });
  }

  public async addGroup(group: Group): Promise<Group> {
    const groupsTable = await this.getGroupsTable();
    return groupsTable.create(group);
  }

  public async updateGroup(id: string, groupInfo: GroupInfo): Promise<Group> {
    const groupsTable = await this.getGroupsTable();
    const result = await groupsTable.update(groupInfo, {
      where: {
        id
      },
      returning: true
    });

    const [updatedGroup] = result[1];

    if (updatedGroup) {
      return updatedGroup;
    }

    throw new Error();
  }

  public async deleteGroupById(id: string): Promise<void> {
    const groupsTable = await this.getGroupsTable();

    const destroyedRows = await groupsTable.destroy({ where: { id } });

    if (destroyedRows > 0) {
      return;
    }

    throw new Error();
  }

  private async getGroupsTable(): Promise<GroupDBModel> {
    if (this.db) {
      return this.db.groups;
    }

    this.db = await this.dbProvider();
    return this.db.groups;
  }
}

export default GroupDataBaseResource;
