import { Model, DataTypes, BuildOptions, Sequelize } from 'sequelize';

import { UserDbModel } from './user.db.model';
import { GroupDbModel } from './group.db.model';
import { USERS_GROUPS_TABLE } from '../constants';

interface UserGroupDb extends Model {
  readonly id: number;
  readonly userId: string;
  readonly groupId: string;
}

export type UserGroupDbModel = typeof Model & {
  new (values?: object, options?: BuildOptions): UserGroupDb;
};

const dataTypes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
};

const userGroupDbModelFactory = (
  seq: Sequelize,
  user: UserDbModel,
  group: GroupDbModel
): UserGroupDbModel => {
  const userGroupModel = seq.define(USERS_GROUPS_TABLE, dataTypes, {
    timestamps: false
  }) as UserGroupDbModel;

  user.belongsToMany(group, {
    through: userGroupModel,
    as: 'groups',
    foreignKey: 'userId'
  });

  group.belongsToMany(user, {
    through: userGroupModel,
    as: 'users',
    foreignKey: 'groupId'
  });

  return userGroupModel;
};

export default userGroupDbModelFactory;
