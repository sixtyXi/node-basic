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

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    const { groupOrm, sequelize } = await this.dbProvider();

    return sequelize.transaction(
      async (transaction): Promise<Group | null> => {
        const group = await groupOrm.findByPk(groupId, { transaction });

        if (group) {
          await group.addUsers(userIds, { transaction });
        }

        return group && groupMapper.fromOrm(group);
      }
    );
  }

  public async getGroupsByUserId(userId: string): Promise<Group[]> {
    const { userOrm, groupOrm } = await this.dbProvider();
    const groups = await groupOrm.findAll({
      include: [{ model: userOrm, as: 'users', where: { id: userId } }]
    });

    return groups.map(groupMapper.toDomain);
  }
}

export default UserGroupOrmRepository;
