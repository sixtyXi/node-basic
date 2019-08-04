import { Expose } from 'class-transformer';
import { IsString, Length, IsInt, Min, Max, IsOptional, IsUUID } from 'class-validator';

export default class UserRequestDTO {
  @IsOptional()
  @IsUUID()
  @Expose()
  public id?: string;

  @IsString()
  @Length(1, 64)
  @Expose()
  public login!: string;

  @IsString()
  @Length(1, 64)
  @Expose()
  public password!: string;

  @IsInt()
  @Min(1)
  @Max(100)
  @Expose()
  public age!: number;
}
