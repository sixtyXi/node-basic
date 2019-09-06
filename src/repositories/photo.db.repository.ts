import { injectable, inject } from 'inversify';

import Photo from '../models/Domain/photo.domain';
import photoMapper from '../mapper/photo.mapper';
import { PHOTOS, USERS } from '../db/constants';
import DbClient from '../db/dbClient';
import { TYPES } from '../TYPES';
import { UserOrmInstance } from '../db/user.builder';
import { PhotoOrmInstance } from '../db/photo.builder';
import { OrmMap } from '../types/ormMap';

@injectable()
class PhotoOrmRepository {
  private models: OrmMap;

  public constructor(
    @inject(TYPES.DbClient)
    private db: DbClient
  ) {
    this.models = db.models;
  }

  public async addUserPhoto(userId: string, photo: Photo): Promise<Photo | null> {
    return this.db.sequelize.transaction(
      async (transaction): Promise<Photo | null> => {
        const user = await (this.models[USERS] as UserOrmInstance).findOne({
          where: { id: userId },
          transaction
        });
        let addedPhoto = null;

        if (user) {
          addedPhoto = await (this.models[PHOTOS] as PhotoOrmInstance).create(photo, {
            transaction
          });
          await user.setPhoto(addedPhoto, { transaction });
        }

        return addedPhoto && photoMapper.fromOrm(addedPhoto);
      }
    );
  }

  public async getUserPhoto(userId: string): Promise<Photo | null> {
    const user = await (this.models[USERS] as UserOrmInstance).findOne({ where: { id: userId } });
    let photo = null;

    if (user) {
      photo = await user.getPhoto();
    }

    return photo && photoMapper.fromOrm(photo);
  }
}

export default PhotoOrmRepository;
