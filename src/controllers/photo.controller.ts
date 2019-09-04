import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import UserService from '../services/user.service';
import PhotoService from '../services/photo.service';
import Validator from '../validator';
import photoMapper from '../mapper/photo.mapper';
import { uploadFile } from '../helpers/uploadFile';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';
import Controller from '../types/Controller';

@injectable()
class PhotoController extends Controller {
  public constructor(
    @inject(UserService)
    private userService: UserService,
    @inject(PhotoService)
    private photoService: PhotoService,
    @inject(Validator)
    private validator: Validator
  ) {
    super();
  }

  public addUserPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      await this.userService.getUserById(id);

      const {
        files: { photo }
      } = await uploadFile(req);

      const uploadedPhoto = photoMapper.fromRequest(photo);
      const addedPhoto = await this.photoService.addUserPhoto(id, uploadedPhoto);

      if (addedPhoto) {
        res.json(addedPhoto);
      } else {
        throw new CustomError(ErrorType.NotFound, this.addUserPhoto.name, { id });
      }
    } catch (error) {
      next(error);
    }
  };

  public getUserPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.userId;
      await this.validator.validateId(id);
      const photo = await this.photoService.getUserPhoto(id);

      if (photo) {
        res.set('Content-Type', photo.type);
        res.sendFile(photo.path);
      } else {
        throw new CustomError(ErrorType.NotFound, this.getUserPhoto.name, { id });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PhotoController;
