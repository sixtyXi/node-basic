import { injectable, inject } from 'inversify';

import PhotoDTO from '../models/DTO/photo.dto';
import Photo from '../models/Domain/photo.domain';
import photoMapper from '../mapper/photo.mapper';
import PhotoOrmRepository from '../repositories/photo.db.repository';
import { catchErrors } from '../helpers/catch';

@injectable()
class PhotoService {
  public constructor(
    @inject(PhotoOrmRepository)
    private photoRepository: PhotoOrmRepository
  ) {}

  @catchErrors()
  public getUserPhoto(userId: string): Promise<Photo | null> {
    return this.photoRepository.getUserPhoto(userId);
  }

  @catchErrors()
  public async addUserPhoto(userId: string, photoDto: PhotoDTO): Promise<Photo | null> {
    const photo = photoMapper.toDomain(photoDto);
    return this.photoRepository.addUserPhoto(userId, photo);
  }
}

export default PhotoService;
