import { Request, Response } from 'express';

import userService from '../services/user.service';

const getUsers = (req: Request, res: Response) => {
  const users = userService.getUsers();

  res.json(users);
};

const getUserById = (req: Request, res: Response) => {
  const user = userService.getUserById(req.params.userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
};

const addUser = (req: Request, res: Response) => {
  const { login, password, age } = req.body;
  const newUser = userService.addUser({ login, password, age });

  res.json(newUser);
};

const updateUser = (req: Request, res: Response) => {
  const { login, password, age } = req.body;
  const updatedUser = userService.updateUser(req.params.userId, { login, password, age });

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(400).end();
  }
};

const deleteUser = (req: Request, res: Response) => {
  const deletedUser = userService.deleteUserById(req.params.userId);

  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(400).end();
  }
};

export default { getUsers, getUserById, addUser, updateUser, deleteUser };
