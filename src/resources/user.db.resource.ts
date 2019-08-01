import { Op } from 'sequelize';
import { injectable, inject } from 'inversify';

import UserResourceContract from '../interfaces/UserResourceContract';
import User, { UserInfo } from '../models/user.model';
import { UserDBModel } from '../db/models/user.db.model';
import DbClient, { DbClientProvider } from '../db/dbClient';

const { ne } = Op;

@injectable()
class UserDataBaseResource implements UserResourceContract {
  private dbProvider: DbClientProvider;

  private db: DbClient | null;

  public constructor(@inject('DbClientProvider') provider: DbClientProvider) {
    this.dbProvider = provider;
    this.db = null;
  }

  public async getUsers(): Promise<User[]> {
    const usersTable = await this.getUsersTable();
    return usersTable.findAll({ where: { isDeleted: { [ne]: true } } });
  }

  public async getUserById(id: string): Promise<User> {
    const usersTable = await this.getUsersTable();
    const user = await usersTable.findByPk(id, { rejectOnEmpty: true });

    if (!user.isDeleted) {
      return user;
    }

    throw new Error();
  }

  public async addUser(user: User): Promise<User> {
    const usersTable = await this.getUsersTable();
    return usersTable.create(user);
  }

  public async updateUser(id: string, userInfo: UserInfo): Promise<User> {
    const usersTable = await this.getUsersTable();
    const result = await usersTable.update(userInfo, {
      where: {
        id
      },
      returning: true
    });

    const [updatedUser] = result[1];

    if (updatedUser) {
      return updatedUser;
    }

    throw new Error();
  }

  public async deleteUserById(id: string): Promise<void> {
    const usersTable = await this.getUsersTable();
    const [updatedRowsQty] = await usersTable.update({ isDeleted: true }, { where: { id } });

    if (updatedRowsQty > 0) {
      return;
    }

    throw new Error();
  }

  private async getUsersTable(): Promise<UserDBModel> {
    if (this.db) {
      return this.db.users;
    }

    this.db = await this.dbProvider();
    return this.db.users;
  }
}

export default UserDataBaseResource;
