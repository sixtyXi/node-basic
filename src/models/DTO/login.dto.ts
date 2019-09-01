import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export default class LoginDTO {
  @IsString()
  @Length(1, 64)
  @Expose()
  public name!: string;

  @IsString()
  @Length(1, 64)
  @Expose()
  public password!: string;
}
