import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin
} from 'sequelize';

import { GroupOrm } from './group.orm';
import { PhotoOrm } from './photo.orm';

export interface UserOrm extends Model {
  readonly id: string;
  login: string;
  password: string;
  age: number;
  getGroups: BelongsToManyGetAssociationsMixin<GroupOrm>;
  getPhoto: HasOneGetAssociationMixin<PhotoOrm>;
  setPhoto: HasOneSetAssociationMixin<PhotoOrm, PhotoOrm['id']>;
  groups?: GroupOrm[];
}

export const dataTypes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  login: {
    type: new DataTypes.STRING(64),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(64),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};
