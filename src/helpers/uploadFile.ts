import { Request } from 'express';
import formidable, { Fields, Files } from 'formidable';
import path from 'path';

export const uploadFile = (req: Request): Promise<{ fields: Fields; files: Files }> => {
  const form = new formidable.IncomingForm();

  form.uploadDir = path.resolve(__dirname, '../../uploads');

  return new Promise((resolve, reject): void => {
    form.parse(req, (err, fields, files): void => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
