import GROUPS from './groups';
import { USERS } from './users';

export default [
  { userId: USERS[0].id, groupId: GROUPS[0].id },
  { userId: USERS[1].id, groupId: GROUPS[0].id },
  { userId: USERS[2].id, groupId: GROUPS[0].id },
  { userId: USERS[2].id, groupId: GROUPS[1].id }
];
