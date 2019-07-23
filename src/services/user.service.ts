import User, { UserInfo } from '../models/user.model';
import UserResourceContract from '../interfaces/UserResourceContract';
import UserResource from '../resources/user.db.resource';

const userResource: UserResourceContract = new UserResource();

const getUsers = (): Promise<User[]> => userResource.getUsers();

const getUserById = (id: string): Promise<User> => userResource.getUserById(id);

const addUser = (userInfo: UserInfo): Promise<User> => {
  const user = new User(userInfo);

  return userResource.addUser(user);
};

const updateUser = (userId: string, userInfo: UserInfo): Promise<User> =>
  userResource.updateUser(userId, userInfo);

const deleteUserById = (id: string): Promise<User> => userResource.deleteUserById(id);

export default { getUsers, getUserById, addUser, updateUser, deleteUserById };
