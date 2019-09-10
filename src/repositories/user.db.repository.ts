import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import User from '../models/Domain/user.domain';
import userMapper from '../mapper/user.mapper';
import DbClient from '../db/dbClient';
import { USERS } from '../db/constants';
import { TYPES } from '../TYPES';
import { UserOrmInstance } from '../db/user.builder';
import { OrmMap } from '../types/ormMap';
import LoginDTO from '../models/DTO/login.dto';

@injectable()
class UserOrmRepository implements UserRepositoryContract {
  private models: OrmMap;

  public constructor(@inject(TYPES.DbClient) private db: DbClient) {
    this.models = db.models;
  }

  public async getUsers(): Promise<User[]> {
    const users = await (this.models[USERS] as UserOrmInstance).findAll();

    return users.map(userMapper.fromOrm);
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await (this.models[USERS] as UserOrmInstance).findOne({
      where: { id }
    });

    return user && userMapper.fromOrm(user);
  }

  public async getUserToLogin(loginDto: LoginDTO): Promise<User | null> {
    const { name: login, password } = loginDto;
    const user = await (this.models[USERS] as UserOrmInstance).findOne({
      where: { password, login }
    });

    return user && userMapper.fromOrm(user);
  }

  public async addUser(user: User): Promise<User> {
    const addedUser = await (this.models[USERS] as UserOrmInstance).create(user);

    return userMapper.fromOrm(addedUser);
  }

  public async updateUser(user: User): Promise<User | null> {
    const result = await (this.models[USERS] as UserOrmInstance).update(user, {
      where: {
        id: user.id
      },
      returning: true
    });

    const [updatedUser = null] = result[1];

    return updatedUser && userMapper.fromOrm(updatedUser);
  }

  public async deleteUserById(id: string): Promise<number> {
    return this.models[USERS].destroy({ where: { id } });
  }
}

export default UserOrmRepository;
