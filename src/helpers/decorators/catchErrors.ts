/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import ApplicationError from '../../types/ApplicationError';
import { ErrorType } from '../../enums/errorTypes';

export function catchErrors(errorType: ErrorType = ErrorType.Application): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any): Promise<any> {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        if (error instanceof ApplicationError) {
          throw error;
        }
        throw new ApplicationError(errorType, propertyKey, args);
      }
    };

    return descriptor;
  };
}
