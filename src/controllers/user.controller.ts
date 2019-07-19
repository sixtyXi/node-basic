import { Request, Response } from 'express';

import userService from '../services/user.service';

const getUsers = (req: Request, res: Response): void => {
  userService
    .getUsers()
    .then((users): void => {
      res.json(users);
    })
    .catch((): void => res.status(404).end());
};

const getUserById = (req: Request, res: Response): void => {
  userService
    .getUserById(req.params.userId)
    .then((user): void => {
      res.json(user);
    })
    .catch((): void => res.status(404).end());
};

const addUser = (req: Request, res: Response): void => {
  const { login, password, age } = req.body;

  userService
    .addUser({ login, password, age })
    .then((user): void => {
      res.json(user);
    })
    .catch((): void => res.status(400).end());
};

const updateUser = (req: Request, res: Response): void => {
  const { login, password, age } = req.body;
  userService
    .updateUser(req.params.userId, { login, password, age })
    .then((user): void => {
      res.json(user);
    })
    .catch((): void => res.status(400).end());
};

const deleteUser = (req: Request, res: Response): void => {
  userService
    .deleteUserById(req.params.userId)
    .then((user): void => {
      res.json(user);
    })
    .catch((): void => res.status(400).end());
};

export default { getUsers, getUserById, addUser, updateUser, deleteUser };
