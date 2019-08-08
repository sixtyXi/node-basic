import { Request, Response, NextFunction } from 'express';
import container from '../ioc.config';

import Validator from '../validator';
import UserService from '../services/user.service';

export const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.userId;

    await container.get(Validator).validateId(id);
    await container.get(UserService).getUserById(id);
    return next();
  } catch (error) {
    return next(error);
  }
};
