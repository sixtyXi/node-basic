/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

import CustomError from '../types/CustomError';
import HttpError from '../types/HttpError';
import { ErrorType } from '../enums/errorTypes';
import { logger } from '../logger';
import ErrorMsg from '../types/ErrorMsg';

function errorHandler(
  err: CustomError | Error | ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = ErrorType.Application;
  let errorResponse = new ErrorMsg();

  if (err instanceof Array && err[0] instanceof ValidationError) {
    statusCode = ErrorType.Validation;
    errorResponse = new ErrorMsg(createValidationMsg(err), err);
  } else if (err instanceof HttpError) {
    statusCode = err.type;
    errorResponse = new ErrorMsg(err.message);
  }

  logger.error(err);
  res.status(statusCode).send(errorResponse);
}

function createValidationMsg(errors: ValidationError[]): string {
  const reducer = (msg: string, item: ValidationError): string => {
    return msg + Object.values(item.constraints).join(', ');
  };

  return errors.reduce(reducer, '');
}

export default errorHandler;
