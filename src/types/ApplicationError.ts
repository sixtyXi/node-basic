/* eslint @typescript-eslint/no-explicit-any: off */
import { ErrorStatus } from '../enums/errorTypes';
import HttpError from './HttpError';

class ApplicationError extends HttpError {
  public constructor(
    status: ErrorStatus,
    public methodName: string,
    public methodArguments: Record<string, any> | {},
    ...params: any[]
  ) {
    super(status, ...params);
    HttpError.captureStackTrace(this, ApplicationError);
  }
}

export default ApplicationError;
