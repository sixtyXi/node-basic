import User, { UserInfo } from '../models/user.model';
import userResource from '../providers/user.db.provider';

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
