import { Model, BuildOptions, Sequelize, ModelCtor } from 'sequelize';

import { USERS as tableName, PHOTOS } from './constants';
import { UserOrm, dataTypes } from '../models/ORM/user.orm';
import { Associable } from '../types/associable';

const options = { paranoid: true };

export type UserOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): UserOrm;
} & Associable;

const userOrmBuilder = (seq: Sequelize): UserOrmInstance => {
  const userOrmInstance = seq.define(tableName, dataTypes, options) as UserOrmInstance;

  userOrmInstance.associate = (models: Record<string, ModelCtor<Model>>): void => {
    userOrmInstance.hasOne(models[PHOTOS], { sourceKey: 'id', foreignKey: 'userId' });
  };

  return userOrmInstance;
};

export default userOrmBuilder;
