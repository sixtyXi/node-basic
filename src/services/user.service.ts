import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import UserDTO from '../models/user.dto.model';
import userMapper from '../mapper/user.mapper';

@injectable()
class UserService {
  private userRepository: UserRepositoryContract;

  public constructor(@inject('UserRepositoryContract') userRepository: UserRepositoryContract) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.getUsers();

    return users.map(userMapper.toDTO);
  }

  public async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.getUserById(id);

    return userMapper.toDTO(user);
  }

  public async addUser(userDTO: UserDTO): Promise<UserDTO> {
    const user = userMapper.toDomain(userDTO);
    const addedUser = await this.userRepository.addUser(user);

    return userMapper.toDTO(addedUser);
  }

  public async updateUser(userDTO: UserDTO): Promise<UserDTO> {
    const user = userMapper.toDomain(userDTO);
    const updatedUser = await this.userRepository.updateUser(user);

    return userMapper.toDTO(updatedUser);
  }

  public deleteUserById(id: string): Promise<void> {
    return this.userRepository.deleteUserById(id);
  }
}

export default UserService;
