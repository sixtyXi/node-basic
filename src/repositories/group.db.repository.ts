import { injectable, inject } from 'inversify';

import { DbClientProvider } from '../db/dbClient';
import Group from '../models/group.model';
import { GroupDb } from '../db/models/group.db.model';

@injectable()
class GroupDbRepository {
  private dbProvider: DbClientProvider;

  public constructor(@inject('DbClientProvider') provider: DbClientProvider) {
    this.dbProvider = provider;
  }

  public async getGroups(): Promise<Group[]> {
    const { groupDbModel } = await this.dbProvider();
    const groups = await groupDbModel.findAll();

    return groups.map(GroupDbRepository.getPlainGroup);
  }

  public async getGroupById(id: string): Promise<Group> {
    const { groupDbModel } = await this.dbProvider();

    return groupDbModel.findByPk(id, { rejectOnEmpty: true, plain: true });
  }

  public async addGroup(group: Group): Promise<Group> {
    const { groupDbModel } = await this.dbProvider();
    const addedGroup = await groupDbModel.create(group);

    return GroupDbRepository.getPlainGroup(addedGroup);
  }

  public async updateGroup(group: Group): Promise<Group> {
    const { groupDbModel } = await this.dbProvider();
    const result = await groupDbModel.update(group, {
      where: {
        id: group.id
      },
      returning: true
    });

    const [updatedGroup] = result[1];

    if (updatedGroup) {
      return GroupDbRepository.getPlainGroup(updatedGroup);
    }

    throw new Error();
  }

  public async deleteGroupById(id: string): Promise<void> {
    const { groupDbModel } = await this.dbProvider();
    const destroyedRows = await groupDbModel.destroy({ where: { id } });

    if (destroyedRows > 0) {
      return;
    }

    throw new Error();
  }

  private static getPlainGroup(group: GroupDb): Group {
    return group.get({ plain: true }) as Group;
  }
}

export default GroupDbRepository;
