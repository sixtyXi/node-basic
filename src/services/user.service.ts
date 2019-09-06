import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import UserRequestDTO from '../models/DTO/user.request.dto';
import userMapper from '../mapper/user.mapper';
import User from '../models/Domain/user.domain';
import { catchErrors } from '../helpers/catch';
import { TYPES } from '../TYPES';

@injectable()
class UserService {
  public constructor(
    @inject(TYPES.UserRepositoryContract)
    private userRepository: UserRepositoryContract
  ) {}

  @catchErrors()
  public getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  @catchErrors()
  public getUserById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  @catchErrors()
  public addUser(userDTO: UserRequestDTO): Promise<User> {
    const user = userMapper.toDomain(userDTO);
    return this.userRepository.addUser(user);
  }

  @catchErrors()
  public updateUser(userDTO: UserRequestDTO): Promise<User | null> {
    const user = userMapper.toDomain(userDTO);
    return this.userRepository.updateUser(user);
  }

  @catchErrors()
  public deleteUserById(id: string): Promise<number> {
    return this.userRepository.deleteUserById(id);
  }
}

export default UserService;
