import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import UserRequestDTO from '../models/DTO/user.request.dto';
import userMapper from '../mapper/user.mapper';
import UserResponseDTO from '../models/DTO/user.response.dto';

@injectable()
class UserService {
  private userRepository: UserRepositoryContract;

  public constructor(@inject('UserRepositoryContract') userRepository: UserRepositoryContract) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.getUsers();

    return users.map(userMapper.toResponse);
  }

  public async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.getUserById(id);

    return userMapper.toResponse(user);
  }

  public async addUser(userDTO: UserRequestDTO): Promise<UserResponseDTO> {
    const user = userMapper.toDomain(userDTO);
    const addedUser = await this.userRepository.addUser(user);

    return userMapper.toResponse(addedUser);
  }

  public async updateUser(userDTO: UserRequestDTO): Promise<UserResponseDTO> {
    const user = userMapper.toDomain(userDTO);
    const updatedUser = await this.userRepository.updateUser(user);

    return userMapper.toResponse(updatedUser);
  }

  public deleteUserById(id: string): Promise<void> {
    return this.userRepository.deleteUserById(id);
  }
}

export default UserService;
