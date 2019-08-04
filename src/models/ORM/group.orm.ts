import { Model, DataTypes, BelongsToManyAddAssociationsMixin } from 'sequelize';

import { Permission } from '../../types/permission';
import { getAllPermissions } from '../../helpers/getAllPermissions';
import { UserOrm } from './user.orm';

export interface GroupOrm extends Model {
  readonly id: string;
  name: string;
  permissions: Permission[];
  addUsers: BelongsToManyAddAssociationsMixin<UserOrm, string>;
  users?: UserOrm[];
}

export const dataTypes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(64),
    allowNull: false
  },
  permissions: {
    type: new DataTypes.ARRAY(DataTypes.ENUM({ values: getAllPermissions() })),
    allowNull: false
  }
};
