/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */
import { Response, NextFunction } from 'express';

import { ErrorStatus } from '../enums/errorTypes';
import { logger } from '../logger';
import ErrorResponse from '../types/ErrorResponse';
import HttpError from '../types/HttpError';
import { AuthRequest } from '../interfaces/AuthRequest';

function errorHandler(err: HttpError, req: AuthRequest, res: Response, next: NextFunction): void {
  const statusCode = err.status || ErrorStatus.Application;
  let errorResponse = {};

  if (process.env.NODE_ENV === 'development' || statusCode === ErrorStatus.Validation) {
    errorResponse = new ErrorResponse(err);
  }

  logger.error(err);
  res.status(statusCode).send(errorResponse);
}

export default errorHandler;
