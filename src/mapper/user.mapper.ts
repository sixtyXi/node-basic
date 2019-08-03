import { plainToClass, classToPlain } from 'class-transformer';

import User from '../models/user.model';
import UserDTO from '../models/user.dto.model';

const toDTO = (userJson: UserDTO): UserDTO => {
  return plainToClass(UserDTO, userJson, { excludeExtraneousValues: true });
};

const toDomain = (userDTO: UserDTO): User => {
  return plainToClass(User, userDTO);
};

const toResponse = (userDTO: UserDTO): UserDTO => {
  return classToPlain(userDTO) as UserDTO;
};

export default { toDTO, toDomain, toResponse };
