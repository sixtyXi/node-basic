import { injectable } from 'inversify';

import User, { UserInfo } from '../models/user.model';
import UserResourceContract from '../interfaces/UserResourceContract';
import USERS from '../mocks/users';

@injectable()
class UserMemoryResource implements UserResourceContract {
  private users = USERS;

  public async getUsers(): Promise<User[]> {
    const noDeletedUsers = this.users.filter((user): boolean => !user.isDeleted);

    return noDeletedUsers;
  }

  public async getUserById(id: string): Promise<User> {
    const foundUser = this.users.find((user): boolean => user.id === id && !user.isDeleted);

    if (foundUser) {
      return foundUser;
    }

    throw new Error();
  }

  public async addUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  public async updateUser(userId: string, userInfo: UserInfo): Promise<User> {
    let updatedUser;

    this.users = this.users.map(
      (user): User => {
        if (user.id === userId) {
          user = { ...user, ...userInfo };
          updatedUser = user;
        }

        return user;
      }
    );

    if (updatedUser) {
      return updatedUser;
    }

    throw new Error();
  }

  public async deleteUserById(id: string): Promise<User> {
    const userToDelete = await this.getUserById(id);

    if (userToDelete) {
      userToDelete.isDeleted = true;
      return userToDelete;
    }

    throw new Error();
  }
}

export default UserMemoryResource;
