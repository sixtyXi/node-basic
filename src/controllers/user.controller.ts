import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import UserService from '../services/user.service';
import userMapper from '../mapper/user.mapper';
import Validator from '../validator';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';
import Controller from '../types/Controller';

@injectable()
class UserController extends Controller {
  public constructor(
    @inject(UserService)
    private userService: UserService,
    @inject(Validator)
    private validator: Validator
  ) {
    super();
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      const userDtos = users.map(userMapper.toResponse);

      res.json(userDtos);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      const user = await this.userService.getUserById(id);

      if (user) {
        const userDto = userMapper.toResponse(user);
        res.json(userDto);
      } else {
        throw new CustomError(ErrorType.NotFound, this.getUserById.name, { id });
      }
    } catch (error) {
      next(error);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = userMapper.fromRequest(req.body);
      await this.validator.validateDto(user);
      const addedUser = await this.userService.addUser(user);
      const userDto = userMapper.toResponse(addedUser);

      res.json(userDto);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { login, password, age } = req.body;
      const id = req.params.userId;
      const user = userMapper.fromRequest({
        id,
        login,
        password,
        age
      });
      await this.validator.validateDto(user);
      const updatedUser = await this.userService.updateUser(user);

      if (updatedUser) {
        const updatedUserDto = userMapper.toResponse(updatedUser);
        res.json(updatedUserDto);
      } else {
        throw new CustomError(ErrorType.NotFound, this.updateUser.name, {
          id,
          login,
          password,
          age
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      const deletedUsersQty = await this.userService.deleteUserById(id);

      if (deletedUsersQty) {
        res.status(200).end();
      } else {
        throw new CustomError(ErrorType.NotFound, this.deleteUser.name, { id });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
