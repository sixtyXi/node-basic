import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import User from '../models/Domain/user.domain';
import { DbClientProvider } from '../types/dbClientProvider';
import userMapper from '../mapper/user.mapper';

@injectable()
class UserOrmRepository implements UserRepositoryContract {
  public constructor(
    @inject('DbClientProvider')
    private dbProvider: DbClientProvider
  ) {}

  public async getUsers(): Promise<User[]> {
    const { userOrm } = await this.dbProvider();
    const users = await userOrm.findAll();

    return users.map(userMapper.fromOrm);
  }

  public async getUserById(id: string): Promise<User | null> {
    const { userOrm } = await this.dbProvider();
    const user = await userOrm.findOne({
      where: { id }
    });

    return user && userMapper.fromOrm(user);
  }

  public async addUser(user: User): Promise<User> {
    const { userOrm } = await this.dbProvider();
    const addedUser = await userOrm.create(user);

    return userMapper.fromOrm(addedUser);
  }

  public async updateUser(user: User): Promise<User | null> {
    const { userOrm } = await this.dbProvider();
    const result = await userOrm.update(user, {
      where: {
        id: user.id
      },
      returning: true
    });

    const [updatedUser = null] = result[1];

    return updatedUser && userMapper.fromOrm(updatedUser);
  }

  public async deleteUserById(id: string): Promise<number> {
    const { userOrm } = await this.dbProvider();
    return userOrm.destroy({ where: { id } });
  }
}

export default UserOrmRepository;
