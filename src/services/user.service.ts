import { injectable, inject } from 'inversify';

import User, { UserInfo } from '../models/user.model';
import UserResourceContract from '../interfaces/UserResourceContract';

@injectable()
class UserService {
  private userResource: UserResourceContract;

  public constructor(@inject('UserResourceContract') userResource: UserResourceContract) {
    this.userResource = userResource;
  }

  public getUsers(): Promise<User[]> {
    return this.userResource.getUsers();
  }

  public getUserById(id: string): Promise<User> {
    return this.userResource.getUserById(id);
  }

  public addUser(userInfo: UserInfo): Promise<User> {
    const user = new User(userInfo);

    return this.userResource.addUser(user);
  }

  public updateUser(userId: string, userInfo: UserInfo): Promise<User> {
    return this.userResource.updateUser(userId, userInfo);
  }

  public deleteUserById(id: string): Promise<void> {
    return this.userResource.deleteUserById(id);
  }
}

export default UserService;
