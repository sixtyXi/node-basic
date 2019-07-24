import User, { UserInfo } from '../models/user.model';

export default interface UserResourceContract {
  getUsers(): Promise<User[]>;

  getUserById(id: string): Promise<User>;

  addUser(user: User): Promise<User>;

  updateUser(userId: string, userInfo: UserInfo): Promise<User>;

  deleteUserById(id: string): Promise<User>;
}
