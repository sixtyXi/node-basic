import { injectable, inject } from 'inversify';

import UserRepositoryContract from '../interfaces/UserRepositoryContract';
import UserRequestDTO from '../models/DTO/user.request.dto';
import userMapper from '../mapper/user.mapper';
import User from '../models/Domain/user.domain';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';

@injectable()
class UserService {
  public constructor(
    @inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract
  ) {}

  public async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.getUsers.name, {});
    }
  }

  public async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.getUserById.name, { id });
    }
  }

  public async addUser(userDTO: UserRequestDTO): Promise<User> {
    try {
      const user = userMapper.toDomain(userDTO);
      const newUser = await this.userRepository.addUser(user);
      return newUser;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.addUser.name, { userDTO });
    }
  }

  public async updateUser(userDTO: UserRequestDTO): Promise<User | null> {
    try {
      const user = userMapper.toDomain(userDTO);
      const updatedUser = await this.userRepository.updateUser(user);
      return updatedUser;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.updateUser.name, { userDTO });
    }
  }

  public async deleteUserById(id: string): Promise<number> {
    try {
      const deletedRows = await this.userRepository.deleteUserById(id);
      return deletedRows;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.deleteUserById.name, { id });
    }
  }
}

export default UserService;
