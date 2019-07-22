import { Request, Response } from 'express';

import userService from '../services/user.service';

async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userService.getUsers();

    res.json(users);
  } catch (error) {
    res.status(404).end();
  }
}

async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await userService.getUserById(req.params.userId);

    res.json(user);
  } catch (error) {
    res.status(404).end();
  }
}

async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const { login, password, age } = req.body;
    const addedUser = await userService.addUser({ login, password, age });

    res.json(addedUser);
  } catch (error) {
    res.status(400).end();
  }
}

async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { login, password, age } = req.body;
    const updatedUser = await userService.updateUser(req.params.userId, { login, password, age });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).end();
  }
}

async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const deletedUser = await userService.deleteUserById(req.params.userId);

    res.json(deletedUser);
  } catch (error) {
    res.status(400).end();
  }
}

export default { getUsers, getUserById, addUser, updateUser, deleteUser };
