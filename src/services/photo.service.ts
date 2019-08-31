import { injectable, inject } from 'inversify';

import PhotoDTO from '../models/DTO/photo.dto';
import Photo from '../models/Domain/photo.domain';
import photoMapper from '../mapper/photo.mapper';
import PhotoOrmRepository from '../repositories/photo.db.repository';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';

@injectable()
class PhotoService {
  public constructor(
    @inject(PhotoOrmRepository)
    private photoRepository: PhotoOrmRepository
  ) {}

  public async getUserPhoto(userId: string): Promise<Photo | null> {
    try {
      const photo = await this.photoRepository.getUserPhoto(userId);
      return photo;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.getUserPhoto.name, { userId });
    }
  }

  public async addUserPhoto(userId: string, photoDto: PhotoDTO): Promise<Photo | null> {
    try {
      const photo = photoMapper.toDomain(photoDto);
      const addedPhoto = await this.photoRepository.addUserPhoto(userId, photo);
      return addedPhoto;
    } catch (error) {
      throw new CustomError(ErrorType.Application, this.addUserPhoto.name, { userId, photoDto });
    }
  }
}

export default PhotoService;
