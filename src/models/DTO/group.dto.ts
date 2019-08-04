import { Expose } from 'class-transformer';
import {
  IsString,
  Length,
  IsOptional,
  IsUUID,
  IsEnum,
  IsArray,
  ArrayNotEmpty
} from 'class-validator';

import { Permission } from '../../types/permission';
import { AccessMask } from '../../enums/accessMask';
import { getAllPermissions } from '../../helpers/getAllPermissions';

export default class GroupDTO {
  @IsOptional()
  @IsUUID()
  @Expose()
  public id?: string;

  @IsString()
  @Length(1, 64)
  @Expose()
  public name!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(AccessMask, {
    each: true,
    message: `Each value in $property must match any value from the list: ${getAllPermissions()}`
  })
  @Expose()
  public permissions!: Permission[];
}
