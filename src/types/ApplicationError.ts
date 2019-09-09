/* eslint @typescript-eslint/no-explicit-any: off */
import { ErrorType } from '../enums/errorTypes';
import HttpError from './HttpError';

class ApplicationError extends HttpError {
  public constructor(
    type: ErrorType,
    public methodName: string,
    public methodArguments: Record<string, any> | {},
    ...params: any[]
  ) {
    super(type, ...params);
    HttpError.captureStackTrace(this, ApplicationError);
  }
}

export default ApplicationError;
