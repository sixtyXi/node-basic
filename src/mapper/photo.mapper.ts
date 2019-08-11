import { plainToClass } from 'class-transformer';

import Photo from '../models/Domain/photo.domain';
import PhotoDTO from '../models/DTO/photo.dto';
import { PhotoOrm } from '../models/ORM/photo.orm';

const fromRequest = (photoJson: PhotoDTO): PhotoDTO => {
  return plainToClass(PhotoDTO, photoJson, { excludeExtraneousValues: true });
};

const toDomain = (photoDTO: PhotoDTO): Photo => {
  return plainToClass(Photo, photoDTO);
};

const fromOrm = (photoOrm: PhotoOrm): Photo => {
  return photoOrm.get({ plain: true }) as Photo;
};

export default { fromRequest, toDomain, fromOrm };
