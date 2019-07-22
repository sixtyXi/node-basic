import express, { Application } from 'express';

import usersRouter from './routes/user.route';

const app: Application = express();

app.use(express.json());
app.use('/', usersRouter);

app.listen(3000, (): void => {
  console.log(`Server started at http://localhost:${process.env.SERVER_PORT}!`);
});
