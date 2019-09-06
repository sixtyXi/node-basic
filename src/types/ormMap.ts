import { GroupOrmInstance } from '../db/group.builder';
import { PhotoOrmInstance } from '../db/photo.builder';
import { UserOrmInstance } from '../db/user.builder';
import { UserGroupOrmInstance } from '../db/userGroup.builder';

export type OrmMap = Record<
  string,
  GroupOrmInstance | PhotoOrmInstance | UserOrmInstance | UserGroupOrmInstance
>;
