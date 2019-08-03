import {
  Model,
  DataTypes,
  BuildOptions,
  Sequelize,
  BelongsToManyAddAssociationsMixin
} from 'sequelize';

import { Permission } from '../../types/permission';
import { UserDb } from './user.db.model';
import { GROUPS_TABLE } from '../constants';

export interface GroupDb extends Model {
  readonly id: string;
  name: string;
  permissions: Permission[];
  addUsers: BelongsToManyAddAssociationsMixin<UserDb, string>;
  users?: UserDb[];
}

export type GroupDbModel = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupDb;
};

const dataTypes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  permissions: {
    type: new DataTypes.ARRAY(
      DataTypes.ENUM({ values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] })
    ),
    allowNull: false
  }
};

const groupDbModelFactory = (seq: Sequelize): GroupDbModel => {
  return seq.define(GROUPS_TABLE, dataTypes, { timestamps: false }) as GroupDbModel;
};

export default groupDbModelFactory;
