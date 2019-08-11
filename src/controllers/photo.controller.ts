import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import UserService from '../services/user.service';
import PhotoService from '../services/photo.service';
import Validator from '../validator';
import photoMapper from '../mapper/photo.mapper';
import { uploadFile } from '../helpers/uploadFile';

@injectable()
class PhotoController {
  public constructor(
    @inject(UserService)
    private userService: UserService,
    @inject(PhotoService)
    private photoService: PhotoService,
    @inject(Validator)
    private validator: Validator
  ) {}

  public addUserPhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      await this.userService.getUserById(id);

      const {
        files: { photo }
      } = await uploadFile(req);

      const uploadedPhoto = photoMapper.fromRequest(photo);
      const addedPhoto = await this.photoService.addUserPhoto(id, uploadedPhoto);

      res.json(addedPhoto);
    } catch (error) {
      res.status(400).end();
    }
  };

  public getUserPhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      const photo = await this.photoService.getUserPhoto(id);

      res.json(photo);
    } catch (error) {
      res.status(404).end();
    }
  };
}

export default PhotoController;
