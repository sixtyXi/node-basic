/* eslint @typescript-eslint/no-explicit-any: off */
import { ErrorType } from '../enums/errorTypes';

class CustomError extends Error {
  public constructor(
    public type: ErrorType,
    public methodName: string,
    public methodArguments: Record<string, any> | {},
    ...params: any[]
  ) {
    super(...params);
    Error.captureStackTrace(this, CustomError);
  }
}

export default CustomError;
