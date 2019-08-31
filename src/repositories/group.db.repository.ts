import { injectable, inject } from 'inversify';

import { DbClientProvider } from '../types/dbClientProvider';
import Group from '../models/Domain/group.domain';
import groupMapper from '../mapper/group.mapper';

@injectable()
class GroupOrmRepository {
  public constructor(
    @inject('DbClientProvider')
    private dbProvider: DbClientProvider
  ) {}

  public async getGroups(): Promise<Group[]> {
    const { groupOrm } = await this.dbProvider();
    const groups = await groupOrm.findAll();

    return groups.map(groupMapper.fromOrm);
  }

  public async getGroupById(id: string): Promise<Group | null> {
    const { groupOrm } = await this.dbProvider();
    const group = await groupOrm.findByPk(id);

    return group && groupMapper.fromOrm(group);
  }

  public async addGroup(group: Group): Promise<Group> {
    const { groupOrm } = await this.dbProvider();
    const addedGroup = await groupOrm.create(group);

    return groupMapper.fromOrm(addedGroup);
  }

  public async updateGroup(group: Group): Promise<Group | null> {
    const { groupOrm } = await this.dbProvider();
    const result = await groupOrm.update(group, {
      where: {
        id: group.id
      },
      returning: true
    });

    const [updatedGroup = null] = result[1];

    return updatedGroup && groupMapper.fromOrm(updatedGroup);
  }

  public async deleteGroupById(id: string): Promise<number> {
    const { groupOrm } = await this.dbProvider();
    return groupOrm.destroy({ where: { id } });
  }
}

export default GroupOrmRepository;
