import { AccessMask } from '../enums/accessMask';

export const getAllPermissions = (): string[] => {
  return Object.keys(AccessMask).filter((key): boolean => Number.isNaN(Number(key)));
};
