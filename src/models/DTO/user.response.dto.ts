import { Expose } from 'class-transformer';

export default class UserResponseDTO {
  @Expose()
  public id?: string;

  @Expose()
  public login!: string;

  @Expose()
  public age!: number;
}
