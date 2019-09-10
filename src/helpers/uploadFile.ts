import formidable, { Fields, Files } from 'formidable';
import path from 'path';
import { AuthRequest } from '../interfaces/AuthRequest';

export const uploadFile = (req: AuthRequest): Promise<{ fields: Fields; files: Files }> => {
  const form = new formidable.IncomingForm();

  form.uploadDir = path.resolve(__dirname, '../../uploads');

  return new Promise((resolve, reject): void => {
    form.parse(req, (err, fields, files): void => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
