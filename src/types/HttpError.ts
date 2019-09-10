/* eslint @typescript-eslint/no-explicit-any: off */
import { ErrorStatus } from '../enums/errorTypes';

class HttpError extends Error {
  public constructor(public status: ErrorStatus, ...params: any[]) {
    super(...params);
    Error.captureStackTrace(this, HttpError);
  }
}

export default HttpError;
