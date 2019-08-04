import User from '../models/Domain/user.domain';

export default interface UserRepositoryContract {
  getUsers(): Promise<User[]>;

  getUserById(id: string): Promise<User>;

  addUser(user: User): Promise<User>;

  updateUser(user: User): Promise<User>;

  deleteUserById(id: string): Promise<void>;
}
