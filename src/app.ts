import express, { Application } from 'express';

import container from './ioc.config';
import UserRouter from './routes/user.route';

const app: Application = express();

app.use(express.json());

const { router: usersRouter } = container.get<UserRouter>(UserRouter);
app.use('/', usersRouter);

app.listen(3000, (): void => {
  console.log(`Server started at http://localhost:${process.env.SERVER_PORT}!`);
});
