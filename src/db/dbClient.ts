import { Sequelize } from 'sequelize';
import { injectable } from 'inversify';

import buildPhotoOrm, { PhotoOrmInstance } from './photo.builder';
import buildGroupOrm, { GroupOrmInstance } from './group.builder';
import buildUserOrm, { UserOrmInstance } from './user.builder';
import buildUserGroupOrm, { UserGroupOrmInstance } from './userGroup.builder';

import GROUPS from '../mocks/groups';
import { USERS } from '../mocks/users';
import USERS_GROUPS from '../mocks/usersGroups';

@injectable()
class DbClient {
  public sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);

  public photoOrm: PhotoOrmInstance;

  public userOrm: UserOrmInstance;

  public groupOrm: GroupOrmInstance;

  public userGroupOrm: UserGroupOrmInstance;

  public isAuthenticated: boolean = false;

  public constructor() {
    this.photoOrm = buildPhotoOrm(this.sequelize);
    this.userOrm = buildUserOrm(this.sequelize, this.photoOrm);
    this.groupOrm = buildGroupOrm(this.sequelize);
    this.userGroupOrm = buildUserGroupOrm(this.sequelize, this.userOrm, this.groupOrm);
  }

  public async init(): Promise<void> {
    await this.sequelize.authenticate();
    await this.sequelize.sync({ force: true });
    await this.addDefaultDataToDb();
    this.isAuthenticated = true;
  }

  private async addDefaultDataToDb(): Promise<void> {
    await this.userOrm.bulkCreate(USERS);
    await this.groupOrm.bulkCreate(GROUPS);
    await this.userGroupOrm.bulkCreate(USERS_GROUPS);
  }
}

export default DbClient;
