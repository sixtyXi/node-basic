import User from '../models/user.model';
import userResource from '../providers/user.memory.provider';

const getUsers = (): User[] => userResource.getUsers();

const getUserById = (id: string): User | undefined => userResource.getUserById(id);

const addUser = (login: string, password: string, age: number): User => {
  const user = new User(login, password, age);

  return userResource.addUser(user);
};

const updateUser = (user: User): User | undefined => userResource.updateUser(user);

const deleteUserById = (id: string): User | undefined => userResource.deleteUserById(id);

export default { getUsers, getUserById, addUser, updateUser, deleteUserById };
