import { Model, DataTypes, BelongsToManyGetAssociationsMixin } from 'sequelize';

import { GroupOrm } from './group.orm';

export interface UserOrm extends Model {
  readonly id: string;
  login: string;
  password: string;
  age: number;
  getGroups: BelongsToManyGetAssociationsMixin<GroupOrm>;
  groups?: GroupOrm[];
}

export const dataTypes = {
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
