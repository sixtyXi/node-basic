import { injectable } from 'inversify';

import User from '../models/user.domain';
import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import { USERS } from '../mocks/users';

@injectable()
class UserMemoryRepository implements UserRepositoryContract {
  private users = USERS as UserMemory[];

  public async getUsers(): Promise<User[]> {
    const allUsers = this.users.filter((user): boolean => !user.isDeleted);

    return allUsers;
  }

  public async getUserById(id: string): Promise<User> {
    const foundUser = this.users.find((user): boolean => user.id === id && !user.isDeleted);

    if (foundUser) {
      return foundUser;
    }

    throw new Error();
  }

  public async addUser(user: User): Promise<User> {
    this.users.push(user as UserMemory);
    return user as User;
  }

  public async updateUser(userToUpdate: User): Promise<User> {
    let updatedUser;

    this.users = this.users.map(
      (user): UserMemory => {
        if (user.id === userToUpdate.id) {
          user = { ...user, ...(userToUpdate as UserMemory) };
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

  public async deleteUserById(id: string): Promise<void> {
    const userToDelete = (await this.getUserById(id)) as UserMemory;

    if (userToDelete) {
      userToDelete.isDeleted = true;
      return;
    }

    throw new Error();
  }
}

class UserMemory extends User {
  public isDeleted: boolean = false;
}

export default UserMemoryRepository;
