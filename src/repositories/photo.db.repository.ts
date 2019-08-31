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

  public async addUserPhoto(userId: string, photo: Photo): Promise<Photo | null> {
    const { userOrm, photoOrm, sequelize } = await this.dbProvider();

    return sequelize.transaction(
      async (transaction): Promise<Photo | null> => {
        const user = await userOrm.findOne({ where: { id: userId }, transaction });
        let addedPhoto = null;

        if (user) {
          addedPhoto = await photoOrm.create(photo, { transaction });
          await user.setPhoto(addedPhoto, { transaction });
        }

        return addedPhoto && photoMapper.fromOrm(addedPhoto);
      }
    );
  }

  public async getUserPhoto(userId: string): Promise<Photo | null> {
    const { userOrm } = await this.dbProvider();
    const user = await userOrm.findOne({ where: { id: userId } });
    let photo = null;

    if (user) {
      photo = await user.getPhoto();
    }

    return photo && photoMapper.fromOrm(photo);
  }
}

export default PhotoOrmRepository;
