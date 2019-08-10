import { Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
class PhotoController {
  public addUserPhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.userId;
      // TODO create photoMetaDto
      res.status(200).end();
    } catch (error) {
      res.status(400).end();
    }
  };

  public getUserPhoto = async (): Promise<void> => {
    // TODO not implemented
  };
}

export default PhotoController;
