import { plainToClass } from 'class-transformer';

import Group from '../models/Domain/group.domain';
import GroupDTO from '../models/DTO/group.dto';
import { GroupOrm } from '../models/ORM/group.orm';

const toDTO = (groupJson: GroupDTO): GroupDTO => {
  return plainToClass(GroupDTO, groupJson, { excludeExtraneousValues: true });
};

const toDomain = (groupDTO: GroupDTO): Group => {
  return plainToClass(Group, groupDTO, { excludeExtraneousValues: true });
};

const fromOrm = (groupOrm: GroupOrm): Group => {
  return groupOrm.get({ plain: true }) as Group;
};

export default { toDTO, toDomain, fromOrm };
