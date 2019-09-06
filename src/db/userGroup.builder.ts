import { Model, BuildOptions, Sequelize, ModelCtor } from 'sequelize';

import { USERS_GROUPS as tableName, USERS, GROUPS } from './constants';

import { UserGroupOrm, dataTypes } from '../models/ORM/userGroup.orm';
import { Associable } from '../types/associable';

const options = { timestamps: false };

export type UserGroupOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): UserGroupOrm;
} & Associable;

const userGroupOrmBuilder = (seq: Sequelize): UserGroupOrmInstance => {
  const userGroupOrmInstance = seq.define(tableName, dataTypes, options) as UserGroupOrmInstance;

  userGroupOrmInstance.associate = (models: Record<string, ModelCtor<Model>>): void => {
    models[USERS].belongsToMany(models[GROUPS], {
      through: userGroupOrmInstance,
      as: 'groups',
      foreignKey: 'userId'
    });

    models[GROUPS].belongsToMany(models[USERS], {
      through: userGroupOrmInstance,
      as: 'users',
      foreignKey: 'groupId'
    });
  };

  return userGroupOrmInstance;
};

export default userGroupOrmBuilder;
