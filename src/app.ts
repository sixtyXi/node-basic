import express, { Application } from 'express';

import container from './ioc.config';
import RootRouter from './routes/root.route';
import errorHandler from './middlewares/errorHandler';
import timing from './middlewares/timing';
import { logger } from './logger';

process.on('uncaughtException', (error: Error): void => {
  logger.log('error', `${new Date().toUTCString()} uncaughtException: ${error.message}`);
  process.exit(1);
});

const app: Application = express();
const { router } = container.get(RootRouter);

app.use(timing);
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

app.listen(3000, (): void => {
  console.log(`Server started at http://localhost:${process.env.SERVER_PORT}!`);
});
