import 'reflect-metadata';
import { Container } from 'inversify';

import UserResourceContract from './interfaces/UserResourceContract';
import UserDataBaseResource from './resources/user.db.resource';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import UserRouter from './routes/user.route';

const container = new Container();

container.bind<UserResourceContract>('UserResourceContract').to(UserDataBaseResource);
container.bind(UserService).toSelf();
container.bind(UserController).toSelf();
container.bind(UserRouter).toSelf();

export default container;
