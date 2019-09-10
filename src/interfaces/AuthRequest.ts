import { Request } from 'express';

export interface AuthRequest extends Request {
  userName?: string;
  userPassword?: string;
}
