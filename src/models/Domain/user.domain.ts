import { v4 as uuid } from 'uuid';
import { Transform } from 'class-transformer';

export default class User {
  @Transform((value): string => value || uuid(), { toClassOnly: true })
  public readonly id: string = uuid();

  public login!: string;

  public password!: string;

  public age!: number;
}
