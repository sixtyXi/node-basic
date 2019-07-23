import { Model, DataTypes } from 'sequelize';

import { UserInfo, Entry } from '../models/user.model';

export class UserTable extends Model implements UserInfo, Entry {
  public readonly id!: string;

  public login!: string;

  public password!: string;

  public age!: number;

  public isDeleted!: boolean;
}

export const userTableDataTypes = {
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
