/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ErrorResponse {
  public message: string;

  public details: Error;

  public constructor(err: Error) {
    this.message = err.message || 'Application error';
    this.details = err;
  }
}
