/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ErrorResponse {
  public constructor(public message: string = '', public details: any = '') {}
}
