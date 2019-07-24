import { Request, Response } from 'express';

import UserService from '../services/user.service';

class UserController {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();

      res.json(users);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserById(req.params.userId);

      res.json(user);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { login, password, age } = req.body;
      const addedUser = await this.userService.addUser({ login, password, age });

      res.json(addedUser);
    } catch (error) {
      res.status(400).end();
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { login, password, age } = req.body;
      const updatedUser = await this.userService.updateUser(req.params.userId, {
        login,
        password,
        age
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(400).end();
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await this.userService.deleteUserById(req.params.userId);

      res.json(deletedUser);
    } catch (error) {
      res.status(400).end();
    }
  }
}

export default UserController;
