import { Model, DataTypes } from 'sequelize';

import Group, { Permission } from '../models/group.model';

export class GroupTable extends Model implements Group {
  public readonly id!: string;

  public name!: string;

  public permissions!: Permission[];
}

export const groupTableDataTypes = {
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
