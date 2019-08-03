/* eslint-disable no-bitwise */
import { Permission } from '../types/permission';

const MASK = {
  READ: 2,
  WRITE: 4,
  DELETE: 8,
  SHARE: 16,
  UPLOAD_FILES: 32
};

const reducer = (result: number, permission: Permission): number => {
  return result | MASK[permission];
};

const getMask = (permissions: Permission[]): number => {
  return permissions.reduce(reducer, 0);
};

export const hasAccess = (
  currentPermissions: Permission[],
  needPermission: Permission[]
): boolean => {
  const current = getMask(currentPermissions);
  const need = getMask(needPermission);
  return need === (current & need);
};
