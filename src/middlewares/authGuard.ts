import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import ApplicationError from '../types/ApplicationError';
import { ErrorStatus } from '../enums/errorTypes';
import LoginDTO from '../models/DTO/login.dto';
import { AuthRequest } from '../interfaces/AuthRequest';

// eslint-disable-next-line consistent-return
function authGuard(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.path === '/login') {
    return next();
  }

  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.SECRET || 'secret';

    jwt.verify(token, secret, (err: Error): void => {
      if (err) {
        next(new ApplicationError(ErrorStatus.Forbidden, authGuard.name, { token }, err.message));
      } else {
        const { name, password } = jwt.decode(token) as LoginDTO;
        req.userName = name;
        req.userPassword = password;
        next();
      }
    });
  } else {
    next(new ApplicationError(ErrorStatus.Unauthorized, authGuard.name, { token }));
  }
}

export default authGuard;
