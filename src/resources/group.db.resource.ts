import { Sequelize } from 'sequelize';
import { injectable } from 'inversify';

import Group, { GroupInfo } from '../models/group.model';
import { GroupTable, groupTableDataTypes } from '../schemas/group.schema';
import GROUPS from '../mocks/groups';

@injectable()
class GroupDataBaseResource {
  private sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);

  private GroupTable = GroupTable;

  public constructor() {
    this.GroupTable.init(groupTableDataTypes, {
      tableName: 'groups',
      sequelize: this.sequelize,
      timestamps: false
    });

    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection was established successfully.');
      await this.sequelize.sync({ force: true });
      await this.GroupTable.bulkCreate(GROUPS);
    } catch (error) {
      console.error('Unable to connect to the database.', error);
    }
  }

  public async getGroups(): Promise<Group[]> {
    return this.GroupTable.findAll();
  }

  public async getGroupById(id: string): Promise<Group> {
    const group = await this.GroupTable.findByPk(id);

    if (group) {
      return group;
    }

    throw new Error();
  }

  public async addGroup(group: Group): Promise<Group> {
    return this.GroupTable.create(group);
  }

  public async updateGroup(id: string, groupInfo: GroupInfo): Promise<Group> {
    const result = await this.GroupTable.update(groupInfo, {
      where: {
        id
      },
      returning: true
    });

    if (result[1]) {
      return result[1][0];
    }

    throw new Error();
  }

  public async deleteGroupById(id: string): Promise<void> {
    const destroyedRows = await this.GroupTable.destroy({ where: { id } });

    if (destroyedRows > 0) {
      return;
    }

    throw new Error();
  }
}

export default GroupDataBaseResource;
