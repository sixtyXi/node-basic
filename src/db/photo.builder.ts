import { Model, BuildOptions, Sequelize } from 'sequelize';

import { PHOTOS as tableName } from './constants';
import { PhotoOrm, dataTypes } from '../models/ORM/photo.orm';
import { Associable } from '../types/associable';

const options = { timestamps: false };

export type PhotoOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): PhotoOrm;
} & Associable;

const photoOrmBuilder = (seq: Sequelize): PhotoOrmInstance => {
  return seq.define(tableName, dataTypes, options) as PhotoOrmInstance;
};

export default photoOrmBuilder;
