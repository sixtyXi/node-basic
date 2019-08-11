import { injectable, inject } from 'inversify';

import PhotoDTO from '../models/DTO/photo.dto';
import Photo from '../models/Domain/photo.domain';
import photoMapper from '../mapper/photo.mapper';
import PhotoOrmRepository from '../repositories/photo.db.repository';

@injectable()
class PhotoService {
  public constructor(
    @inject(PhotoOrmRepository)
    private photoRepository: PhotoOrmRepository
  ) {}

  public async getUserPhoto(userId: string): Promise<Photo> {
    return this.photoRepository.getUserPhoto(userId);
  }

  public async addUserPhoto(userId: string, photoDto: PhotoDTO): Promise<Photo> {
    const photo = photoMapper.toDomain(photoDto);
    return this.photoRepository.addUserPhoto(userId, photo);
  }
}

export default PhotoService;
