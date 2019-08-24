import { Model, DataTypes } from 'sequelize';

export interface PhotoOrm extends Model {
  readonly id: string;
  name: string;
  type: string;
  path: string;
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
  type: {
    type: new DataTypes.STRING(64),
    allowNull: false
  },
  path: {
    type: new DataTypes.STRING(128),
    allowNull: false
  }
};
