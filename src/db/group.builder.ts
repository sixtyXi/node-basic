import { Model, BuildOptions, Sequelize } from 'sequelize';

import { GroupOrm, dataTypes } from '../models/ORM/group.orm';

const tableName = 'Groups';
const options = { timestamps: false };

export type GroupOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupOrm;
};

const groupOrmBuilder = (seq: Sequelize): GroupOrmInstance => {
  return seq.define(tableName, dataTypes, options) as GroupOrmInstance;
};

export default groupOrmBuilder;
