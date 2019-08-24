import { v4 as uuid } from 'uuid';
import { Transform } from 'class-transformer';

export default class Photo {
  @Transform((value): string => value || uuid(), { toClassOnly: true })
  public readonly id: string = uuid();

  public name!: string;

  public type!: string;

  public path!: string;
}
