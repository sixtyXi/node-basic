import { Request, Response, NextFunction, RequestHandler } from 'express';

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const uploadSingle = (fieldName: string): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload.single(fieldName)(req, res, next);
};
