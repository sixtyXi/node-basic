import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import User from '../models/user.domain';
import { DbClientProvider } from '../db/dbClient';
import { UserDb } from '../db/models/user.db.model';

@injectable()
class UserDbRepository implements UserRepositoryContract {
  private dbProvider: DbClientProvider;

  public constructor(@inject('DbClientProvider') provider: DbClientProvider) {
    this.dbProvider = provider;
  }

  public async getUsers(): Promise<User[]> {
    const { userDbModel } = await this.dbProvider();
    const users = await userDbModel.findAll();

    return users.map(UserDbRepository.getPlainUser);
  }

  public async getUserById(id: string): Promise<User> {
    const { userDbModel } = await this.dbProvider();
    const user = await userDbModel.findOne({
      where: { id },
      rejectOnEmpty: true
    });

    return UserDbRepository.getPlainUser(user);
  }

  public async addUser(user: User): Promise<User> {
    const { userDbModel } = await this.dbProvider();
    const addedUser = await userDbModel.create(user);

    return UserDbRepository.getPlainUser(addedUser);
  }

  public async updateUser(user: User): Promise<User> {
    const { userDbModel } = await this.dbProvider();
    const result = await userDbModel.update(user, {
      where: {
        id: user.id
      },
      returning: true
    });

    const [updatedUser] = result[1];

    if (updatedUser) {
      return UserDbRepository.getPlainUser(updatedUser);
    }

    throw new Error();
  }

  public async deleteUserById(id: string): Promise<void> {
    const { userDbModel } = await this.dbProvider();
    const destroyedRows = await userDbModel.destroy({ where: { id } });

    if (destroyedRows > 0) {
      return;
    }

    throw new Error();
  }

  private static getPlainUser(user: UserDb): User {
    return user.get({ plain: true }) as User;
  }
}

export default UserDbRepository;
