import User from '../models/Domain/user.domain';
import LoginDTO from '../models/DTO/login.dto';

export default interface UserRepositoryContract {
  getUsers(): Promise<User[]>;

  getUserById(id: string): Promise<User | null>;

  addUser(user: User): Promise<User>;

  updateUser(user: User): Promise<User | null>;

  deleteUserById(id: string): Promise<number>;

  getUserToLogin(login: LoginDTO): Promise<User | null>;
}
