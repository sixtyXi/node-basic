import { Sequelize, Model, DataTypes, Op } from 'sequelize';

import User, { UserInfo, Entry } from '../models/user.model';
import USERS from '../mocks/users';

const sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);
const { ne } = Op;

class UserTable extends Model implements UserInfo, Entry {
  public readonly id!: string;

  public login!: string;

  public password!: string;

  public age!: number;

  public isDeleted!: boolean;
}

UserTable.init(
  {
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
  },
  {
    tableName: 'users',
    sequelize,
    modelName: 'user',
    timestamps: false
  }
);

(async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection was established successfully.');
    await sequelize.sync({ force: true });
    await UserTable.bulkCreate(USERS);
  } catch (error) {
    console.error('Unable to connect to the database.', error);
  }
})();

async function getUsers(): Promise<User[]> {
  return UserTable.findAll({ where: { isDeleted: { [ne]: true } } });
}

async function getUserById(id: string): Promise<User> {
  const user = await UserTable.findByPk(id);

  if (user && !user.isDeleted) {
    return user;
  }

  throw new Error();
}

async function addUser(user: User): Promise<User> {
  return UserTable.create(user);
}

async function updateUser(id: string, userInfo: UserInfo): Promise<User> {
  const result = await UserTable.update(userInfo, {
    where: {
      id
    },
    returning: true
  });

  if (result[1]) {
    return result[1][0];
  }

  throw new Error();
}

async function deleteUserById(id: string): Promise<User> {
  const result = await UserTable.update(
    { isDeleted: true },
    {
      where: {
        id
      },
      returning: true
    }
  );

  if (result[1]) {
    return result[1][0];
  }

  throw new Error();
}

export default { getUsers, getUserById, addUser, updateUser, deleteUserById };
