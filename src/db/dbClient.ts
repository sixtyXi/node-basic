import { Sequelize } from 'sequelize';
import { injectable } from 'inversify';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import {
  USERS as userModel,
  GROUPS as groupModel,
  USERS_GROUPS as usersGroupsModel
} from './constants';

import GROUPS from '../mocks/groups';
import { USERS } from '../mocks/users';
import USERS_GROUPS from '../mocks/usersGroups';
import { GroupOrmInstance } from './group.builder';
import { UserOrmInstance } from './user.builder';
import { UserGroupOrmInstance } from './userGroup.builder';
import { OrmMap } from '../types/ormMap';

@injectable()
class DbClient {
  public sequelize = new Sequelize(`${process.env.POSTGRE_URI}`);

  public models: OrmMap = {};

  private isInitialized: boolean = false;

  public async init(): Promise<void> {
    if (!this.isInitialized) {
      await this.sequelize.authenticate();
      await this.importModels();
      this.associateModels();
      await this.sequelize.sync({ force: true });
      await this.addDefaultDataToDb();
      this.isInitialized = true;
    }
  }

  private async importModels(): Promise<void> {
    const basename = path.basename(__filename);
    const getFiles = promisify(fs.readdir);
    const files = await getFiles(__dirname);

    files
      .filter((file): boolean => {
        return file !== basename && file.endsWith('.builder.ts');
      })
      .forEach((file): void => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const model = this.sequelize.import(path.join(__dirname, file)) as any;
        this.models[model.name] = model;
      });
  }

  private associateModels(): void {
    Object.keys(this.models as OrmMap).forEach((modelName): void => {
      if (this.models[modelName].associate) {
        this.models[modelName].associate(this.models);
      }
    });
  }

  private async addDefaultDataToDb(): Promise<void> {
    await (this.models[userModel] as UserOrmInstance).bulkCreate(USERS);
    await (this.models[groupModel] as GroupOrmInstance).bulkCreate(GROUPS);
    await (this.models[usersGroupsModel] as UserGroupOrmInstance).bulkCreate(USERS_GROUPS);
  }
}

export default DbClient;
