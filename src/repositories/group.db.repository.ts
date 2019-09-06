import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';

import Group from '../models/Domain/group.domain';
import groupMapper from '../mapper/group.mapper';
import { GROUPS } from '../db/constants';
import DbClient from '../db/dbClient';
import { GroupOrmInstance } from '../db/group.builder';
import { OrmMap } from '../types/ormMap';

@injectable()
class GroupOrmRepository {
  private models: OrmMap;

  public constructor(@inject(TYPES.DbClient) private db: DbClient) {
    this.models = db.models;
  }

  public async getGroups(): Promise<Group[]> {
    const groups = await (this.models[GROUPS] as GroupOrmInstance).findAll();

    return groups.map(groupMapper.fromOrm);
  }

  public async getGroupById(id: string): Promise<Group | null> {
    const group = await (this.models[GROUPS] as GroupOrmInstance).findByPk(id);

    return group && groupMapper.fromOrm(group);
  }

  public async addGroup(group: Group): Promise<Group> {
    const addedGroup = await (this.models[GROUPS] as GroupOrmInstance).create(group);

    return groupMapper.fromOrm(addedGroup);
  }

  public async updateGroup(group: Group): Promise<Group | null> {
    const result = await (this.models[GROUPS] as GroupOrmInstance).update(group, {
      where: {
        id: group.id
      },
      returning: true
    });

    const [updatedGroup = null] = result[1];

    return updatedGroup && groupMapper.fromOrm(updatedGroup);
  }

  public async deleteGroupById(id: string): Promise<number> {
    return this.models[GROUPS].destroy({ where: { id } });
  }
}

export default GroupOrmRepository;
