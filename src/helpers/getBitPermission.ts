import { AccessMask } from '../enums/accessMask';
import { Permission } from '../types/permission';

const reducer = (result: number, key: Permission): number => {
  return result | AccessMask[key];
};

export const getBitPermission = (permissions: Permission[]): number => {
  return permissions.reduce(reducer, 0);
};
