import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.send({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
