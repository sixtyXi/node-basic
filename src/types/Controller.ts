import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

import HttpError from './HttpError';
import { ErrorType } from '../enums/errorTypes';

@injectable()
abstract class Controller {
  public notAllowed = (req: Request, res: Response, next: NextFunction): void => {
    const { methods } = req.route;

    const allowedMethods = Object.keys(methods)
      .filter((name): boolean => !name.startsWith('_'))
      .map((name): string => name.toUpperCase());

    next(new HttpError(ErrorType.NotAllowed, `Allowed: ${allowedMethods.join(',')}`));
  };
}

export default Controller;
