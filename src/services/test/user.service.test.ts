import 'reflect-metadata';
import uuid from 'uuid';

import UserRepositoryContract from '../../interfaces/UserRepositoryContract';

import MockUserOrmRepository from '../../repositories/__mocks__/user.db.repository';

import { USERS_DTO, USERS } from '../../mocks/users';
import UserService from '../user.service';
import User from '../../models/Domain/user.domain';

describe('User service', (): void => {
  let userService: UserService;
  let mockUserOrmRepository: UserRepositoryContract;

  beforeEach((): void => {
    MockUserOrmRepository.mockClear();
    mockUserOrmRepository = new MockUserOrmRepository();
    userService = new UserService(mockUserOrmRepository);
  });

  it('should return an array of users', async (): Promise<void> => {
    const users = await userService.getUsers();

    expect(mockUserOrmRepository.getUsers).toHaveBeenCalled();
    expect(Array.isArray(users)).toBe(true);
    users.forEach((user): User => expect(user).toBeInstanceOf(User));
  });

  it('should create a new user', async (): Promise<void> => {
    const userDto = USERS_DTO[0];
    const createdUser = await userService.addUser(userDto);

    expect(mockUserOrmRepository.addUser).toHaveBeenCalled();
    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser.login).toBe(userDto.login);
    expect(createdUser.age).toBe(userDto.age);
    expect(createdUser.password).toBe(userDto.password);
    expect(createdUser.id).not.toBeUndefined();
  });

  it('should return user by id', async (): Promise<void> => {
    const userId = USERS[0].id;
    const user = await userService.getUserById(userId);

    expect(mockUserOrmRepository.getUserById).toHaveBeenCalled();
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(userId);
  });

  it('should update user', async (): Promise<void> => {
    const userDto = USERS_DTO[0];
    userDto.id = uuid();
    const updatedUser = await userService.updateUser(userDto);

    expect(mockUserOrmRepository.updateUser).toHaveBeenCalled();
    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.login).toBe(userDto.login);
    expect(updatedUser.age).toBe(userDto.age);
    expect(updatedUser.password).toBe(userDto.password);
    expect(updatedUser.id).toBe(userDto.id);
  });

  it('should invoke deleteUserById from repository', async (): Promise<void> => {
    await userService.deleteUserById(uuid());

    expect(mockUserOrmRepository.deleteUserById).toHaveBeenCalled();
  });
});
