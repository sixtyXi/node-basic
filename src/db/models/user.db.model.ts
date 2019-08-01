import { Model, DataTypes, BuildOptions, Sequelize } from 'sequelize';

import User from '../../models/user.model';
import { USERS_TABLE } from '../constants';

export interface UserDB extends User, Model {}

export type UserDBModel = typeof Model & {
  new (values?: object, options?: BuildOptions): UserDB;
};

const dataTypes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  login: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
};

const initUsers = (seq: Sequelize): UserDBModel => {
  return seq.define(USERS_TABLE, dataTypes, { timestamps: false }) as UserDBModel;
};

export default initUsers;
