import { Response, NextFunction } from 'express';
import { injectable } from 'inversify';

import HttpError from './HttpError';
import { ErrorStatus } from '../enums/errorTypes';
import { AuthRequest } from '../interfaces/AuthRequest';

@injectable()
abstract class Controller {
  public notAllowed = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const { methods } = req.route;

    const allowedMethods = Object.keys(methods)
      .filter((name): boolean => !name.startsWith('_'))
      .map((name): string => name.toUpperCase());

    next(new HttpError(ErrorStatus.NotAllowed, `Allowed: ${allowedMethods.join(',')}`));
  };
}

export default Controller;
