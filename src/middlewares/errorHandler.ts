/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';
import { logger } from '../logger';

function errorHandler(
  err: CustomError | Error | ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = ErrorType.Application;
  let errorMessage;

  if (err instanceof Array && err[0] instanceof ValidationError) {
    statusCode = ErrorType.Validation;
    errorMessage = err;
  } else if (err instanceof CustomError) {
    statusCode = err.type;
    errorMessage = err.message;
  }

  logger.error(err);
  res.status(statusCode).send({ message: errorMessage });
}

export default errorHandler;
