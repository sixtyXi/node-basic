import { injectable } from 'inversify';

import User from '../models/Domain/user.domain';
import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import { USERS } from '../mocks/users';
import LoginDTO from '../models/DTO/login.dto';

@injectable()
class UserMemoryRepository implements UserRepositoryContract {
  private users = USERS as UserMemory[];

  public async getUsers(): Promise<User[]> {
    const allUsers = this.users.filter((user): boolean => !user.isDeleted);

    return allUsers;
  }

  public async getUserById(id: string): Promise<User | null> {
    const foundUser = this.users.find((user): boolean => user.id === id && !user.isDeleted);

    return foundUser || null;
  }

  public async addUser(user: User): Promise<User> {
    this.users.push(user as UserMemory);
    return user as User;
  }

  public async updateUser(userToUpdate: User): Promise<User | null> {
    let updatedUser = null;

    this.users = this.users.map(
      (user): UserMemory => {
        if (user.id === userToUpdate.id) {
          user = { ...user, ...(userToUpdate as UserMemory) };
          updatedUser = user;
        }

        return user;
      }
    );

    return updatedUser;
  }

  public async deleteUserById(id: string): Promise<number> {
    const userToDelete = (await this.getUserById(id)) as UserMemory;

    if (userToDelete) {
      userToDelete.isDeleted = true;
    }

    return userToDelete ? 1 : 0;
  }

  public async getUserToLogin(loginDto: LoginDTO): Promise<User | null> {
    const { name, password } = loginDto;

    const foundUser = this.users.find(
      (user): boolean => user.login === name && user.password === password && !user.isDeleted
    );

    return foundUser || null;
  }
}

class UserMemory extends User {
  public isDeleted: boolean = false;
}

export default UserMemoryRepository;
