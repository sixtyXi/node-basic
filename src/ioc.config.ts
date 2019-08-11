import 'reflect-metadata';
import { Container } from 'inversify';

import DbClient from './db/dbClient';
import { DbClientProvider } from './types/dbClientProvider';

import UserRepositoryContract from './interfaces/UserRepositoryContract';
import UserOrmRepository from './repositories/user.db.repository';
import GroupOrmRepository from './repositories/group.db.repository';
import UserGroupOrmRepository from './repositories/userGroup.db.repository';
import PhotoOrmRepository from './repositories/photo.db.repository';

import UserService from './services/user.service';
import GroupService from './services/group.service';
import UserGroupService from './services/userGroup.service';
import PhotoService from './services/photo.service';

import UserController from './controllers/user.controller';
import GroupController from './controllers/group.controller';
import PhotoController from './controllers/photo.controller';

import Validator from './validator';

import UserRouter from './routes/user.route';
import GroupRouter from './routes/group.route';

import RootRouter from './routes/root.route';

const container = new Container();

container
  .bind<DbClient>('DbClient')
  .to(DbClient)
  .inSingletonScope();

container.bind<DbClientProvider>('DbClientProvider').toProvider<DbClient>(
  (context): DbClientProvider => {
    return async (): Promise<DbClient> => {
      const dbClient = context.container.get<DbClient>('DbClient');
      if (!dbClient.isAuthenticated) {
        await dbClient.init();
      }
      return dbClient;
    };
  }
);

container.bind<UserRepositoryContract>('UserRepositoryContract').to(UserOrmRepository);
container.bind(UserService).toSelf();
container.bind(UserController).toSelf();
container.bind(UserRouter).toSelf();

container.bind(GroupOrmRepository).toSelf();
container.bind(GroupService).toSelf();
container.bind(GroupController).toSelf();
container.bind(GroupRouter).toSelf();

container.bind(UserGroupOrmRepository).toSelf();
container.bind(UserGroupService).toSelf();

container.bind(PhotoOrmRepository).toSelf();
container.bind(PhotoService).toSelf();
container.bind(PhotoController).toSelf();

container.bind(Validator).toSelf();

container.bind(RootRouter).toSelf();

export default container;
