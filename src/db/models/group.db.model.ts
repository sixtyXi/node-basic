import { Model, DataTypes, BuildOptions, Sequelize } from 'sequelize';

import Group from '../../models/group.model';
import { GROUPS_TABLE } from '../constants';

interface GroupDB extends Group, Model {}

export type GroupDBModel = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupDB;
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

const initGroups = (seq: Sequelize): GroupDBModel => {
  return seq.define(GROUPS_TABLE, dataTypes, { timestamps: false }) as GroupDBModel;
};

export default initGroups;
