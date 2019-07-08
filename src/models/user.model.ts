import { v4 as uuid } from 'uuid';

export default class User {
  public id: string = uuid();

  public login: string;

  public password: string;

  public age: number;

  public isDeleted: boolean = false;

  public constructor(login: string, password: string, age: number) {
    this.login = login;
    this.password = password;
    this.age = age;
  }
}
