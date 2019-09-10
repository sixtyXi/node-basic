import UserRepositoryContract from '../../interfaces/UserRepositoryContract';
import User from '../../models/Domain/user.domain';
import { USERS } from '../../mocks/users';

const mock = jest.fn(
  (): UserRepositoryContract => {
    return {
      getUsers: jest.fn(async (): Promise<User[]> => USERS),
      getUserById: jest.fn(async (): Promise<User> => USERS[0]),
      addUser: jest.fn(async (user): Promise<User> => user),
      updateUser: jest.fn(async (user): Promise<User> => user),
      deleteUserById: jest.fn(),
      getUserToLogin: jest.fn()
    };
  }
);

export default mock;
