import { Model, BuildOptions, Sequelize } from 'sequelize';

import { PhotoOrm, dataTypes } from '../models/ORM/photo.orm';

const tableName = 'Photos';
const options = { timestamps: false };

export type PhotoOrmInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): PhotoOrm;
};

const photoOrmBuilder = (seq: Sequelize): PhotoOrmInstance => {
  return seq.define(tableName, dataTypes, options) as PhotoOrmInstance;
};

export default photoOrmBuilder;
