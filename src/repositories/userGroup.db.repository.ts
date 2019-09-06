import { injectable, inject } from 'inversify';

import Group from '../models/Domain/group.domain';
import groupMapper from '../mapper/group.mapper';
import DbClient from '../db/dbClient';
import { TYPES } from '../TYPES';
import { GroupOrmInstance } from '../db/group.builder';
import { GROUPS, USERS } from '../db/constants';
import { OrmMap } from '../types/ormMap';

@injectable()
class UserGroupOrmRepository {
  private models: OrmMap;

  public constructor(
    @inject(TYPES.DbClient)
    private db: DbClient
  ) {
    this.models = db.models;
  }

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    return this.db.sequelize.transaction(
      async (transaction): Promise<Group | null> => {
        const group = await (this.models[GROUPS] as GroupOrmInstance).findByPk(groupId, {
          transaction
        });

        if (group) {
          await group.addUsers(userIds, { transaction });
        }

        return group && groupMapper.fromOrm(group);
      }
    );
  }

  public async getGroupsByUserId(userId: string): Promise<Group[]> {
    const groups = await (this.models[GROUPS] as GroupOrmInstance).findAll({
      include: [{ model: this.models[USERS], as: 'users', where: { id: userId } }]
    });

    return groups.map(groupMapper.toDomain);
  }
}

export default UserGroupOrmRepository;
