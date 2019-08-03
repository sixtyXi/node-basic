import { injectable, inject } from 'inversify';

import { DbClientProvider } from '../db/dbClient';
import Group from '../models/group.model';
import groupMapper from '../mapper/group.mapper';

@injectable()
class UserGroupDbRepository {
  private dbProvider: DbClientProvider;

  public constructor(@inject('DbClientProvider') provider: DbClientProvider) {
    this.dbProvider = provider;
  }

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    const { groupDbModel, sequelize } = await this.dbProvider();

    await sequelize.transaction(
      async (transaction): Promise<void> => {
        const group = await groupDbModel.findByPk(groupId, { rejectOnEmpty: true, transaction });
        return group.addUsers(userIds, { transaction });
      }
    );
  }

  public async getGroupsByUserId(userId: string): Promise<Group[]> {
    const { userDbModel, groupDbModel } = await this.dbProvider();
    const groups = await groupDbModel.findAll({
      include: [{ model: userDbModel, as: 'users', where: { id: userId } }]
    });

    if (groups.length) {
      return groups.map(groupMapper.toDomain);
    }
    throw new Error();
  }
}

export default UserGroupDbRepository;
