import 'reflect-metadata';
import { Container } from 'inversify';

import UserResourceContract from './interfaces/UserResourceContract';
import UserDataBaseResource from './resources/user.db.resource';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import UserRouter from './routes/user.route';

import GroupDataBaseResource from './resources/group.db.resource';
import GroupService from './services/group.service';
import GroupController from './controllers/group.controller';
import GroupRouter from './routes/group.route';

import RootRouter from './routes/root.route';

const container = new Container();

container.bind<UserResourceContract>('UserResourceContract').to(UserDataBaseResource);
container.bind(UserService).toSelf();
container.bind(UserController).toSelf();
container.bind(UserRouter).toSelf();

container.bind(GroupDataBaseResource).toSelf();
container.bind(GroupService).toSelf();
container.bind(GroupController).toSelf();
container.bind(GroupRouter).toSelf();

container.bind(RootRouter).toSelf();

export default container;
