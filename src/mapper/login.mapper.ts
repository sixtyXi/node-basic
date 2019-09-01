import { plainToClass } from 'class-transformer';

import LoginDTO from '../models/DTO/login.dto';

const fromRequest = (userJson: LoginDTO): LoginDTO => {
  return plainToClass(LoginDTO, userJson, { excludeExtraneousValues: true });
};

export default { fromRequest };
