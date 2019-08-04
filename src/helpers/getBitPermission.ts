import { Permission } from '../types/permission';
import { permissions as permissionsEnum } from '../enums/permissions';

const reducer = (result: number, permission: Permission): number => {
  return result | permissionsEnum[permission];
};

export const getBitPermission = (permissions: Permission[]): number => {
  return permissions.reduce(reducer, 0);
};
