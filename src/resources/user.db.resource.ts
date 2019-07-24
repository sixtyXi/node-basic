import { Sequelize, Op } from 'sequelize';
import { injectable } from 'inversify';

import User, { UserInfo } from '../models/user.model';
import UserResourceContract from '../interfaces/UserResourceContract';
import { UserTable, userTableDataTypes } from '../schemas/user.schema';
import USERS from '../mocks/users';

const { ne } = Op;

@injectable()
class UserDataBaseResource implements UserResourceContract {
  private sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);

  private UserTable = UserTable;

  public constructor() {
    this.UserTable.init(userTableDataTypes, {
      tableName: 'users',
      sequelize: this.sequelize,
      timestamps: false
    });

    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection was established successfully.');
      await this.sequelize.sync({ force: true });
      await this.UserTable.bulkCreate(USERS);
    } catch (error) {
      console.error('Unable to connect to the database.', error);
    }
  }

  public async getUsers(): Promise<User[]> {
    return this.UserTable.findAll({ where: { isDeleted: { [ne]: true } } });
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.UserTable.findByPk(id);

    if (user && !user.isDeleted) {
      return user;
    }

    throw new Error();
  }

  public async addUser(user: User): Promise<User> {
    return this.UserTable.create(user);
  }

  public async updateUser(id: string, userInfo: UserInfo): Promise<User> {
    const result = await this.UserTable.update(userInfo, {
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

  public async deleteUserById(id: string): Promise<User> {
    const result = await this.UserTable.update(
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
}

export default UserDataBaseResource;
