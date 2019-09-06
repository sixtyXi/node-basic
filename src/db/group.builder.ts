import { Model, BuildOptions, Sequelize } from 'sequelize';

import { GROUPS as tableName } from './constants';
import { GroupOrm, dataTypes } from '../models/ORM/group.orm';
import { Associable } from '../types/associable';

const options = { timestamps: false };

export type GroupOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupOrm;
} & Associable;

const groupOrmBuilder = (seq: Sequelize): GroupOrmInstance => {
  return seq.define(tableName, dataTypes, options) as GroupOrmInstance;
};

export default groupOrmBuilder;
