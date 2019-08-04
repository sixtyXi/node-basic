import { Model, BuildOptions, Sequelize } from 'sequelize';

import { UserOrm, dataTypes } from '../models/ORM/user.orm';

const tableName = 'Users';
const options = { paranoid: true };

export type UserOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): UserOrm;
};

const userOrmBuilder = (seq: Sequelize): UserOrmInstance => {
  return seq.define(tableName, dataTypes, options) as UserOrmInstance;
};

export default userOrmBuilder;
