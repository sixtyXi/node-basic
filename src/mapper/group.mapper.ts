import { plainToClass } from 'class-transformer';

import Group from '../models/group.domain';
import GroupDTO from '../models/group.dto';

const toDTO = (groupJson: GroupDTO): GroupDTO => {
  return plainToClass(GroupDTO, groupJson, { excludeExtraneousValues: true });
};

const toDomain = (groupDTO: GroupDTO): Group => {
  return plainToClass(Group, groupDTO, { excludeExtraneousValues: true });
};

export default { toDTO, toDomain };
