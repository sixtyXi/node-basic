import { Model, BuildOptions, Sequelize } from 'sequelize';

import { UserGroupOrm, dataTypes } from '../models/ORM/userGroup.orm';
import { UserOrmInstance } from './user.builder';
import { GroupOrmInstance } from './group.builder';

const tableName = 'Users_Groups';
const options = { timestamps: false };

export type UserGroupOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): UserGroupOrm;
};

const userGroupOrmBuilder = (
  seq: Sequelize,
  user: UserOrmInstance,
  group: GroupOrmInstance
): UserGroupOrmInstance => {
  const userGroupOrmInstance = seq.define(tableName, dataTypes, options) as UserGroupOrmInstance;

  user.belongsToMany(group, {
    through: userGroupOrmInstance,
    as: 'groups',
    foreignKey: 'userId'
  });

  group.belongsToMany(user, {
    through: userGroupOrmInstance,
    as: 'users',
    foreignKey: 'groupId'
  });

  return userGroupOrmInstance;
};

export default userGroupOrmBuilder;
