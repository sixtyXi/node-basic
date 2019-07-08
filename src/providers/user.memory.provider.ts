import User from '../models/user.model';
import USERS from '../mocks/users';

let users = USERS;

const getUsers = (): User[] => users.filter((user): boolean => !user.isDeleted);

const getUserById = (id: string): User | undefined => users.find((user): boolean => user.id === id);

const addUser = (user: User): User => {
  users.push(user);
  return user;
};

const updateUser = (userToUpdate: User): User | undefined => {
  let updatedUser;

  users = users.map(
    (user): User => {
      if (user.id === userToUpdate.id) {
        updatedUser = { ...user, ...userToUpdate };
        return updatedUser;
      }
      return user;
    }
  );

  return updatedUser;
};

const deleteUserById = (id: string): User | undefined => {
  const deletedUser = getUserById(id);

  if (deletedUser) {
    deletedUser.isDeleted = true;
  }

  return deletedUser;
};

export default { getUsers, getUserById, addUser, updateUser, deleteUserById };
