import { Model, DataTypes } from 'sequelize';

export interface UserGroupOrm extends Model {
  readonly id: number;
  readonly userId: string;
  readonly groupId: string;
}

export const dataTypes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
};
