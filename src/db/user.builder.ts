import { Model, BuildOptions, Sequelize } from 'sequelize';

import { UserOrm, dataTypes } from '../models/ORM/user.orm';
import { PhotoOrmInstance } from './photo.builder';

const tableName = 'Users';
const options = { paranoid: true };

export type UserOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): UserOrm;
};

const userOrmBuilder = (seq: Sequelize, photo: PhotoOrmInstance): UserOrmInstance => {
  const userOrmInstance = seq.define(tableName, dataTypes, options) as UserOrmInstance;
  userOrmInstance.hasOne(photo, { sourceKey: 'id', foreignKey: 'userId' });
  return userOrmInstance;
};

export default userOrmBuilder;
