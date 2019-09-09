import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import UserService from '../services/user.service';
import PhotoService from '../services/photo.service';
import Validator from '../validator';
import photoMapper from '../mapper/photo.mapper';
import { uploadFile } from '../helpers/uploadFile';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';
import Controller from '../types/Controller';
import { TYPES } from '../TYPES';
import { handleErrors } from '../helpers/decorators/handleErrors';

@injectable()
class PhotoController extends Controller {
  public constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
    @inject(TYPES.PhotoService)
    private photoService: PhotoService,
    @inject(TYPES.Validator)
    private validator: Validator
  ) {
    super();
  }

  @handleErrors()
  public addUserPhoto = async (req: Request, res: Response): Promise<void> => {
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
  };

  @handleErrors()
  public getUserPhoto = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.userId;
    await this.validator.validateId(id);
    const photo = await this.photoService.getUserPhoto(id);

    if (photo) {
      res.set('Content-Type', photo.type);
      res.sendFile(photo.path);
    } else {
      throw new CustomError(ErrorType.NotFound, this.getUserPhoto.name, { id });
    }
  };
}

export default PhotoController;
