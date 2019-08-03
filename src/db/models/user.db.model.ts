import {
  Model,
  DataTypes,
  BuildOptions,
  Sequelize,
  BelongsToManyGetAssociationsMixin
} from 'sequelize';

import { GroupDb } from './group.db.model';
import { USERS_TABLE } from '../constants';

export interface UserDb extends Model {
  readonly id: string;
  login: string;
  password: string;
  age: number;
  getGroups: BelongsToManyGetAssociationsMixin<GroupDb>;
  groups?: GroupDb[];
}

export type UserDbModel = typeof Model & {
  new (values?: object, options?: BuildOptions): UserDb;
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
  }
};

const userDbModelFactory = (seq: Sequelize): UserDbModel => {
  return seq.define(USERS_TABLE, dataTypes, { paranoid: true }) as UserDbModel;
};

export default userDbModelFactory;
