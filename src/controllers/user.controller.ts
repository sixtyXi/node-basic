import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import UserService from '../services/user.service';
import userMapper from '../mapper/user.mapper';
import Validator from '../validator';
import ApplicationError from '../types/ApplicationError';
import { ErrorType } from '../enums/errorTypes';
import Controller from '../types/Controller';
import { TYPES } from '../TYPES';
import { handleErrors } from '../helpers/decorators/handleErrors';

@injectable()
class UserController extends Controller {
  public constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
    @inject(TYPES.Validator)
    private validator: Validator
  ) {
    super();
  }

  @handleErrors()
  public getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getUsers();
    const userDtos = users.map(userMapper.toResponse);

    res.json(userDtos);
  };

  @handleErrors()
  public getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.userId;
    await this.validator.validateId(id);
    const user = await this.userService.getUserById(id);

    if (user) {
      const userDto = userMapper.toResponse(user);
      res.json(userDto);
    } else {
      throw new ApplicationError(ErrorType.NotFound, this.getUserById.name, { id });
    }
  };

  @handleErrors()
  public addUser = async (req: Request, res: Response): Promise<void> => {
    const user = userMapper.fromRequest(req.body);
    await this.validator.validateDto(user);
    const addedUser = await this.userService.addUser(user);
    const userDto = userMapper.toResponse(addedUser);

    res.json(userDto);
  };

  @handleErrors()
  public updateUser = async (req: Request, res: Response): Promise<void> => {
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
      throw new ApplicationError(ErrorType.NotFound, this.updateUser.name, {
        id,
        login,
        password,
        age
      });
    }
  };

  @handleErrors()
  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.userId;
    await this.validator.validateId(id);
    const deletedUsersQty = await this.userService.deleteUserById(id);

    if (deletedUsersQty) {
      res.status(204).end();
    } else {
      throw new ApplicationError(ErrorType.NotFound, this.deleteUser.name, { id });
    }
  };
}

export default UserController;
