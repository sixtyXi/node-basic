import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import User from '../models/Domain/user.domain';
import { DbClientProvider } from '../types/dbClientProvider';
import userMapper from '../mapper/user.mapper';

@injectable()
class UserOrmRepository implements UserRepositoryContract {
  private dbProvider: DbClientProvider;

  public constructor(@inject('DbClientProvider') provider: DbClientProvider) {
    this.dbProvider = provider;
  }

  public async getUsers(): Promise<User[]> {
    const { userOrm } = await this.dbProvider();
    const users = await userOrm.findAll();

    return users.map(userMapper.fromOrm);
  }

  public async getUserById(id: string): Promise<User> {
    const { userOrm } = await this.dbProvider();
    const user = await userOrm.findOne({
      where: { id },
      rejectOnEmpty: true
    });

    return userMapper.fromOrm(user);
  }

  public async addUser(user: User): Promise<User> {
    const { userOrm } = await this.dbProvider();
    const addedUser = await userOrm.create(user);

    return userMapper.fromOrm(addedUser);
  }

  public async updateUser(user: User): Promise<User> {
    const { userOrm } = await this.dbProvider();
    const result = await userOrm.update(user, {
      where: {
        id: user.id
      },
      returning: true
    });

    const [updatedUser] = result[1];

    if (updatedUser) {
      return userMapper.fromOrm(updatedUser);
    }

    throw new Error();
  }

  public async deleteUserById(id: string): Promise<void> {
    const { userOrm } = await this.dbProvider();
    const destroyedRows = await userOrm.destroy({ where: { id } });

    if (destroyedRows > 0) {
      return;
    }

    throw new Error();
  }
}

export default UserOrmRepository;
