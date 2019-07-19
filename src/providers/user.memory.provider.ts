import User, { UserInfo } from '../models/user.model';
import USERS from '../mocks/users';

let users = USERS;

async function getUsers(): Promise<User[]> {
  const noDeletedUsers = users.filter((user): boolean => !user.isDeleted);

  return noDeletedUsers;
}

async function getUserById(id: string): Promise<User> {
  const foundUser = users.find((user): boolean => user.id === id && !user.isDeleted);

  if (foundUser) {
    return foundUser;
  }

  throw new Error();
}

async function addUser(user: User): Promise<User> {
  users.push(user);
  return user;
}

async function updateUser(userId: string, userInfo: UserInfo): Promise<User> {
  let updatedUser;

  users = users.map(
    (user): User => {
      if (user.id === userId) {
        user = { ...user, ...userInfo };
        updatedUser = user;
      }

      return user;
    }
  );

  if (updatedUser) {
    return updatedUser;
  }

  throw new Error();
}

async function deleteUserById(id: string): Promise<User> {
  const userToDelete = await getUserById(id);

  if (userToDelete) {
    userToDelete.isDeleted = true;
    return userToDelete;
  }

  throw new Error();
}

export default { getUsers, getUserById, addUser, updateUser, deleteUserById };
