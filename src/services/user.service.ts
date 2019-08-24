import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import UserRequestDTO from '../models/DTO/user.request.dto';
import userMapper from '../mapper/user.mapper';
import User from '../models/Domain/user.domain';

@injectable()
class UserService {
  public constructor(
    @inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract
  ) {}

  public getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  public getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  public addUser(userDTO: UserRequestDTO): Promise<User> {
    const user = userMapper.toDomain(userDTO);
    return this.userRepository.addUser(user);
  }

  public updateUser(userDTO: UserRequestDTO): Promise<User> {
    const user = userMapper.toDomain(userDTO);
    return this.userRepository.updateUser(user);
  }

  public deleteUserById(id: string): Promise<void> {
    return this.userRepository.deleteUserById(id);
  }
}

export default UserService;
