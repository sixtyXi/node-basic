/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

import ApplicationError from '../types/ApplicationError';
import { ErrorType } from '../enums/errorTypes';
import { logger } from '../logger';
import ErrorResponse from '../types/ErrorResponse';

function errorHandler(
  err: Error | ApplicationError | ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = ErrorType.Application;
  let errorResponse = new ErrorResponse();

  if (err instanceof Array && err[0] instanceof ValidationError) {
    statusCode = ErrorType.Validation;
  } else if (err instanceof ApplicationError) {
    statusCode = err.type;
  }

  if (process.env.NODE_ENV === 'development' || statusCode === ErrorType.Validation) {
    errorResponse = new ErrorResponse(createMsg(err), err);
  }

  logger.error(err);
  res.status(statusCode).send(errorResponse);
}

function createMsg(err: Error | ApplicationError | ValidationError[]): string {
  let msg = 'Application error';

  if (err instanceof Array && err[0] instanceof ValidationError) {
    msg = createValidationMsg(err);
  } else if (err instanceof Error && err.message) {
    msg = err.message;
  }

  return msg;
}

function createValidationMsg(errors: ValidationError[]): string {
  const reducer = (msg: string, item: ValidationError): string => {
    return msg + Object.values(item.constraints).join(', ');
  };

  return errors.reduce(reducer, '');
}

export default errorHandler;
