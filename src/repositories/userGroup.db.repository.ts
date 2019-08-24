import { injectable, inject } from 'inversify';

import { DbClientProvider } from '../types/dbClientProvider';
import Group from '../models/Domain/group.domain';
import groupMapper from '../mapper/group.mapper';

@injectable()
class UserGroupOrmRepository {
  public constructor(
    @inject('DbClientProvider')
    private dbProvider: DbClientProvider
  ) {}

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    const { groupOrm, sequelize } = await this.dbProvider();

    await sequelize.transaction(
      async (transaction): Promise<void> => {
        const group = await groupOrm.findByPk(groupId, { rejectOnEmpty: true, transaction });
        return group.addUsers(userIds, { transaction });
      }
    );
  }

  public async getGroupsByUserId(userId: string): Promise<Group[]> {
    const { userOrm, groupOrm } = await this.dbProvider();
    const groups = await groupOrm.findAll({
      include: [{ model: userOrm, as: 'users', where: { id: userId } }]
    });

    if (groups.length) {
      return groups.map(groupMapper.toDomain);
    }
    throw new Error();
  }
}

export default UserGroupOrmRepository;
