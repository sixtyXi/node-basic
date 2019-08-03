import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import userMapper from '../mapper/user.mapper';
import UserService from '../services/user.service';

@injectable()
class UserController {
  private userService: UserService;

  public constructor(@inject(UserService) userService: UserService) {
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
      const user = userMapper.fromRequest(req.body);
      const addedUser = await this.userService.addUser(user);

      res.json(addedUser);
    } catch (error) {
      res.status(400).end();
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { login, password, age } = req.body;
      const user = userMapper.fromRequest({
        id: req.params.userId,
        login,
        password,
        age
      });
      const updatedUser = await this.userService.updateUser(user);

      res.json(updatedUser);
    } catch (error) {
      res.status(400).end();
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userService.deleteUserById(req.params.userId);
      res.status(200).end();
    } catch (error) {
      res.status(400).end();
    }
  }
}

export default UserController;
