import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import UserService from '../services/user.service';
import userMapper from '../mapper/user.mapper';
import Validator from '../validator';

@injectable()
class UserController {
  public constructor(
    @inject(UserService)
    private userService: UserService,
    @inject(Validator)
    private validator: Validator
  ) {}

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
      const id = req.params.userId;
      await this.validator.validateId(id);
      const user = await this.userService.getUserById(id);

      res.json(user);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async addUser(req: Request, res: Response): Promise<void> {
    try {
      const user = userMapper.fromRequest(req.body);
      await this.validator.validateUser(user);
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
      await this.validator.validateUser(user);
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
