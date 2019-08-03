import { plainToClass } from 'class-transformer';

import User from '../models/user.domain';
import UserRequestDTO from '../models/user.request.dto';
import UserResponseDTO from '../models/user.response.dto';

const fromRequest = (userJson: UserRequestDTO): UserRequestDTO => {
  return plainToClass(UserRequestDTO, userJson, { excludeExtraneousValues: true });
};

const toDomain = (userDTO: UserRequestDTO): User => {
  return plainToClass(User, userDTO);
};

const toResponse = (userDomain: User): UserResponseDTO => {
  return plainToClass(UserResponseDTO, userDomain, { excludeExtraneousValues: true });
};

export default { fromRequest, toDomain, toResponse };
