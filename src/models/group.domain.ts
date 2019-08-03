import { v4 as uuid } from 'uuid';
import { Transform, Expose } from 'class-transformer';

import { Permission } from '../types/permission';

export default class Group {
  @Expose()
  @Transform((value): string => value || uuid(), { toClassOnly: true })
  public readonly id: string = uuid();

  @Expose()
  public name!: string;

  @Expose()
  public permissions!: Permission[];
}
