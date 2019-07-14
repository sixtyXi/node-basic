import { v4 as uuid } from 'uuid';

export default class User {
  readonly id: string = uuid();

  public login: string;

  public password: string;

  public age: number;

  public isDeleted: boolean = false;

  public constructor(userInfo: UserInfo) {
    this.login = userInfo.login;
    this.password = userInfo.password;
    this.age = userInfo.age;
  }
}

export interface UserInfo {
  login: string;
  password: string;
  age: number;
}
