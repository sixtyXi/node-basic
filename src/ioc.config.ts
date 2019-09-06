import 'reflect-metadata';
import { Container } from 'inversify';

import { TYPES } from './TYPES';
import DbClient from './db/dbClient';

import UserRepositoryContract from './interfaces/UserRepositoryContract';
import UserOrmRepository from './repositories/user.db.repository';
import GroupOrmRepository from './repositories/group.db.repository';
import UserGroupOrmRepository from './repositories/userGroup.db.repository';
import PhotoOrmRepository from './repositories/photo.db.repository';

import UserService from './services/user.service';
import GroupService from './services/group.service';
import UserGroupService from './services/userGroup.service';
import PhotoService from './services/photo.service';
import LoginService from './services/login.service';

import UserController from './controllers/user.controller';
import GroupController from './controllers/group.controller';
import PhotoController from './controllers/photo.controller';
import LoginController from './controllers/login.controller';

import Validator from './validator';

import UserRouter from './routes/user.route';
import GroupRouter from './routes/group.route';
import LoginRouter from './routes/login.route';

import RootRouter from './routes/root.route';

const container = new Container();

container
  .bind<DbClient>(TYPES.DbClient)
  .to(DbClient)
  .inSingletonScope();

container.bind<UserRepositoryContract>(TYPES.UserRepositoryContract).to(UserOrmRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserRouter>(TYPES.UserRouter).to(UserRouter);

container.bind<GroupOrmRepository>(TYPES.GroupOrmRepository).to(GroupOrmRepository);
container.bind<GroupService>(TYPES.GroupService).to(GroupService);
container.bind<GroupController>(TYPES.GroupController).to(GroupController);
container.bind<GroupRouter>(TYPES.GroupRouter).to(GroupRouter);

container.bind<UserGroupOrmRepository>(TYPES.UserGroupOrmRepository).to(UserGroupOrmRepository);
container.bind<UserGroupService>(TYPES.UserGroupService).to(UserGroupService);

container.bind<PhotoOrmRepository>(TYPES.PhotoOrmRepository).to(PhotoOrmRepository);
container.bind<PhotoService>(TYPES.PhotoService).to(PhotoService);
container.bind<PhotoController>(TYPES.PhotoController).to(PhotoController);

container.bind<LoginService>(TYPES.LoginService).to(LoginService);
container.bind<LoginController>(TYPES.LoginController).to(LoginController);
container.bind<LoginRouter>(TYPES.LoginRouter).to(LoginRouter);

container.bind<Validator>(TYPES.Validator).to(Validator);

container.bind<RootRouter>(TYPES.RootRouter).to(RootRouter);

export default container;
