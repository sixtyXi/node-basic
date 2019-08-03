import { Sequelize } from 'sequelize';
import { injectable } from 'inversify';

import buildGroupModel, { GroupDbModel } from './models/group.db.model';
import buildUserModel, { UserDbModel } from './models/user.db.model';
import buildUserGroupModel, { UserGroupDbModel } from './models/userGroup.db.model';
import GROUPS from '../mocks/groups';
import { USERS } from '../mocks/users';
import USERS_GROUPS from '../mocks/usersGroups';

export type DbClientProvider = () => Promise<DbClient>;

@injectable()
class DbClient {
  public sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);

  public userDbModel: UserDbModel;

  public groupDbModel: GroupDbModel;

  public userGroupDbModel: UserGroupDbModel;

  public isAuthenticated: boolean = false;

  public constructor() {
    this.userDbModel = buildUserModel(this.sequelize);
    this.groupDbModel = buildGroupModel(this.sequelize);
    this.userGroupDbModel = buildUserGroupModel(
      this.sequelize,
      this.userDbModel,
      this.groupDbModel
    );
  }

  public async init(): Promise<void> {
    await this.sequelize.authenticate();
    await this.sequelize.sync({ force: true });
    await this.addDefaultDataToDb();
    this.isAuthenticated = true;
  }

  private async addDefaultDataToDb(): Promise<void> {
    await this.userDbModel.bulkCreate(USERS);
    await this.groupDbModel.bulkCreate(GROUPS);
    await this.userGroupDbModel.bulkCreate(USERS_GROUPS);
  }
}

export default DbClient;
