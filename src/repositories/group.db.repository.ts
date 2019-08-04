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

  public async getGroupById(id: string): Promise<Group> {
    const { groupOrm } = await this.dbProvider();

    return groupOrm.findByPk(id, { rejectOnEmpty: true, plain: true });
  }

  public async addGroup(group: Group): Promise<Group> {
    const { groupOrm } = await this.dbProvider();
    const addedGroup = await groupOrm.create(group);

    return groupMapper.fromOrm(addedGroup);
  }

  public async updateGroup(group: Group): Promise<Group> {
    const { groupOrm } = await this.dbProvider();
    const result = await groupOrm.update(group, {
      where: {
        id: group.id
      },
      returning: true
    });

    const [updatedGroup] = result[1];

    if (updatedGroup) {
      return groupMapper.fromOrm(updatedGroup);
    }

    throw new Error();
  }

  public async deleteGroupById(id: string): Promise<void> {
    const { groupOrm } = await this.dbProvider();
    const destroyedRows = await groupOrm.destroy({ where: { id } });

    if (destroyedRows > 0) {
      return;
    }

    throw new Error();
  }
}

export default GroupOrmRepository;
