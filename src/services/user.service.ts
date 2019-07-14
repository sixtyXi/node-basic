import User, { UserInfo } from '../models/user.model';
import userResource from '../providers/user.memory.provider';

const getUsers = (): User[] => userResource.getUsers();

const getUserById = (id: string): User | undefined => userResource.getUserById(id);

const addUser = (userInfo: UserInfo): User => {
  const user = new User(userInfo);

  return userResource.addUser(user);
};

const updateUser = (userId: string, userInfo: UserInfo): User | undefined =>
  userResource.updateUser(userId, userInfo);

const deleteUserById = (id: string): User | undefined => userResource.deleteUserById(id);

export default { getUsers, getUserById, addUser, updateUser, deleteUserById };
