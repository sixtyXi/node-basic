import express, { Application } from 'express';

import container from './ioc.config';
import RootRouter from './routes/root.route';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();
const { router } = container.get(RootRouter);

app.use(express.json());
app.use('/', router);
app.use(errorHandler);

app.listen(3000, (): void => {
  console.log(`Server started at http://localhost:${process.env.SERVER_PORT}!`);
});
