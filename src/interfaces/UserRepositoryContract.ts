import User from '../models/Domain/user.domain';

export default interface UserRepositoryContract {
  getUsers(): Promise<User[]>;

  getUserById(id: string): Promise<User | null>;

  addUser(user: User): Promise<User>;

  updateUser(user: User): Promise<User | null>;

  deleteUserById(id: string): Promise<number>;
}
