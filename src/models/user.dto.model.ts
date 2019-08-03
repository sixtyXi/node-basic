import { Expose, Exclude } from 'class-transformer';

export default class UserDTO {
  @Expose()
  public id?: string;

  @Expose()
  public login!: string;

  @Expose()
  @Exclude({ toPlainOnly: true })
  public password?: string;

  @Expose()
  public age!: number;
}
