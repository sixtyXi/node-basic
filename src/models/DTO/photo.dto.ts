import { Expose } from 'class-transformer';

export default class PhotoDTO {
  @Expose()
  public name!: string;

  @Expose()
  public type!: string;

  @Expose()
  public path!: string;
}
