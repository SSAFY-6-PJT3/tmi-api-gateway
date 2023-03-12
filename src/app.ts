import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  const data = { data: 'data' };
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
