import { Sequelize } from 'sequelize';
import { injectable } from 'inversify';

import initGroupModel, { GroupDBModel } from './models/group.db.model';
import initUserModel, { UserDBModel } from './models/user.db.model';
import GROUPS from '../mocks/groups';
import USERS from '../mocks/users';

export type DbClientProvider = () => Promise<DbClient>;

@injectable()
class DbClient {
  private sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);

  public groups: GroupDBModel;

  public users: UserDBModel;

  public constructor() {
    this.groups = initGroupModel(this.sequelize);
    this.users = initUserModel(this.sequelize);
  }

  public async init(): Promise<void> {
    await this.sequelize.authenticate();
    await this.sequelize.sync({ force: true });
    await this.addDefaultDataToDb();
  }

  private async addDefaultDataToDb(): Promise<void> {
    await this.groups.bulkCreate(GROUPS);
    await this.users.bulkCreate(USERS);
  }
}

export default DbClient;
