import { permissions } from '../enums/permissions';

export const getAllPermissions = (): string[] => {
  return Object.keys(permissions).filter((key): boolean => Number.isNaN(Number(key)));
};
