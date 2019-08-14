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

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      const userDtos = users.map(userMapper.toResponse);

      res.json(userDtos);
    } catch (error) {
      res.status(404).end();
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      const user = await this.userService.getUserById(id);
      const userDto = userMapper.toResponse(user);
      res.json(userDto);
    } catch (error) {
      res.status(404).end();
    }
  };

  public addUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = userMapper.fromRequest(req.body);
      await this.validator.validateUser(user);
      const addedUser = await this.userService.addUser(user);
      const userDto = userMapper.toResponse(addedUser);

      res.json(userDto);
    } catch (error) {
      res.status(400).end();
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
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
      const updatedUserDto = userMapper.toResponse(updatedUser);

      res.json(updatedUserDto);
    } catch (error) {
      res.status(400).end();
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userService.deleteUserById(req.params.userId);
      res.status(200).end();
    } catch (error) {
      res.status(400).end();
    }
  };
}

export default UserController;
