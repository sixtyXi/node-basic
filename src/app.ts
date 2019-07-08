import express from 'express';

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello World!');
});

app.listen(3000, (): void => {
  console.log('Example app listening on port 3000!');
});
