import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';

// eslint-disable-next-line consistent-return
function authGuard(req: Request, res: Response, next: NextFunction): void {
  if (req.path === '/login') {
    return next();
  }

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'secret', (err: Error): void => {
      if (err) {
        next(new CustomError(ErrorType.Forbidden, authGuard.name, { token }, err.message));
      } else next();
    });
  } else {
    next(new CustomError(ErrorType.Unauthorized, authGuard.name, { token }));
  }
}

export default authGuard;
