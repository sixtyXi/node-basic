import { v4 as uuid } from 'uuid';

export default class Group implements GroupInfo {
  public readonly id: string = uuid();

  public name: string;

  public permissions: Permission[];

  public constructor(groupInfo: GroupInfo) {
    this.name = groupInfo.name;
    this.permissions = groupInfo.permissions;
  }
}

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}

export interface GroupInfo {
  name: string;
  permissions: Permission[];
}
