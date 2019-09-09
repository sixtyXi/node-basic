/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
import { Request, Response, NextFunction } from 'express';

export function handleErrors(): Function {
  return (): PropertyDescriptor => {
    let originalMethod: Function;

    return {
      configurable: true,
      enumerable: false,
      get(): Function {
        return async (...args: [Request, Response, NextFunction]): Promise<void> => {
          try {
            await originalMethod.apply(this, args);
          } catch (error) {
            const [, , next] = args;
            next(error);
          }
        };
      },
      set(method: Function): void {
        originalMethod = method;
      }
    };
  };
}
