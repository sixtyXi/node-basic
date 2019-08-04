import { Expose } from 'class-transformer';

export default class UserRequestDTO {
  @Expose()
  public id?: string;

  @Expose()
  public login!: string;

  @Expose()
  public password!: string;

  @Expose()
  public age!: number;
}
