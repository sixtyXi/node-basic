import { Expose } from 'class-transformer';

import { Permission } from '../../types/permission';

export default class GroupDTO {
  @Expose()
  public id?: string;

  @Expose()
  public name!: string;

  @Expose()
  public permissions!: Permission[];
}
