import express, { Application } from 'express';

import container from './ioc.config';
import { TYPES } from './TYPES';
import RootRouter from './routes/root.route';
import DbClient from './db/dbClient';
import errorHandler from './middlewares/errorHandler';
import timing from './middlewares/timing';
import authGuard from './middlewares/authGuard';
import { logger } from './logger';

process.on('uncaughtException', (error: Error): void => {
  logger.log('error', `${new Date().toUTCString()} uncaughtException: ${error.message}`);
  process.exit(1);
});

const { router } = container.get<RootRouter>(TYPES.RootRouter);
const app: Application = express();

app.use(timing);
app.use(express.json());
app.use(authGuard);
app.use('/', router);
app.use(errorHandler);

const dbClient = container.get<DbClient>(TYPES.DbClient);
dbClient.init().then((): void => {
  app.listen(3000, (): void => {
    console.log(`Server started at http://localhost:${process.env.SERVER_PORT}!`);
  });
});
