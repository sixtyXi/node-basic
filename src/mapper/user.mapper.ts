import { plainToClass } from 'class-transformer';

import User from '../models/Domain/user.domain';
import UserRequestDTO from '../models/DTO/user.request.dto';
import UserResponseDTO from '../models/DTO/user.response.dto';
import { UserOrm } from '../models/ORM/user.orm';

const fromRequest = (userJson: UserRequestDTO): UserRequestDTO => {
  return plainToClass(UserRequestDTO, userJson, { excludeExtraneousValues: true });
};

const toDomain = (userDTO: UserRequestDTO): User => {
  return plainToClass(User, userDTO);
};

const toResponse = (userDomain: User): UserResponseDTO => {
  return plainToClass(UserResponseDTO, userDomain, { excludeExtraneousValues: true });
};

const fromOrm = (userOrm: UserOrm): User => {
  return userOrm.get({ plain: true }) as User;
};

export default { fromRequest, toDomain, toResponse, fromOrm };
