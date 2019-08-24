import { injectable, inject } from 'inversify';

import { DbClientProvider } from '../types/dbClientProvider';
import Photo from '../models/Domain/photo.domain';
import photoMapper from '../mapper/photo.mapper';

@injectable()
class PhotoOrmRepository {
  public constructor(
    @inject('DbClientProvider')
    private dbProvider: DbClientProvider
  ) {}

  public async addUserPhoto(userId: string, photo: Photo): Promise<Photo> {
    const { userOrm, photoOrm } = await this.dbProvider();

    const addedPhoto = await photoOrm.create(photo);
    const user = await userOrm.findOne({ where: { id: userId }, rejectOnEmpty: true });
    await user.setPhoto(addedPhoto);
    return photoMapper.fromOrm(addedPhoto);
  }

  public async getUserPhoto(userId: string): Promise<Photo> {
    const { userOrm } = await this.dbProvider();
    const user = await userOrm.findOne({ where: { id: userId }, rejectOnEmpty: true });
    const photo = await user.getPhoto();
    return photoMapper.fromOrm(photo);
  }
}

export default PhotoOrmRepository;
