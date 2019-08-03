import 'reflect-metadata';
import { Container } from 'inversify';

import DbClient, { DbClientProvider } from './db/dbClient';

import UserRepositoryContract from './interfaces/UserRepositoryContract';
import UserDbRepository from './repositories/user.db.repository';
import GroupDbRepository from './repositories/group.db.repository';
import UserGroupDbRepository from './repositories/userGroup.db.repository';

import UserService from './services/user.service';
import GroupService from './services/group.service';
import UserGroupService from './services/userGroup.service';

import UserController from './controllers/user.controller';
import GroupController from './controllers/group.controller';

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

container.bind<UserRepositoryContract>('UserRepositoryContract').to(UserDbRepository);
container.bind(UserService).toSelf();
container.bind(UserController).toSelf();
container.bind(UserRouter).toSelf();

container.bind(GroupDbRepository).toSelf();
container.bind(GroupService).toSelf();
container.bind(GroupController).toSelf();
container.bind(GroupRouter).toSelf();

container.bind(UserGroupDbRepository).toSelf();
container.bind(UserGroupService).toSelf();

container.bind(RootRouter).toSelf();

export default container;
