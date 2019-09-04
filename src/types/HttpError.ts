/* eslint @typescript-eslint/no-explicit-any: off */
import { ErrorType } from '../enums/errorTypes';

class HttpError extends Error {
  public constructor(public type: ErrorType, ...params: any[]) {
    super(...params);
    Error.captureStackTrace(this, HttpError);
  }
}

export default HttpError;
