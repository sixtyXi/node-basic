import { ContainerModule, Container } from 'inversify';

import UserRepositoryContract from '../../interfaces/UserRepositoryContract';
import UserOrmRepository from '../../repositories/user.db.repository';

import { USERS_DTO } from '../../mocks/users';
import UserService from '../user.service';

const dependencies = new ContainerModule((bind): void => {
  bind(UserService).toSelf();
  bind<UserRepositoryContract>('UserRepositoryContract').to(jest.fn());
});

describe('User service', (): void => {
  let container: Container;
  let userService: UserService;

  beforeEach((): void => {
    container = new Container();
    container.load(dependencies);
    userService = container.get(UserService);
  });

  it('should create a new user', async (): Promise<void> => {
    const newUser = USERS_DTO[0];
    UserOrmRepository.
    const createdUser = await userService.addUser(newUser);
    expect(createdUser.login).toBe(newUser.login);
  });
});
