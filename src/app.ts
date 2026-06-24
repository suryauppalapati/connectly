import express, { type Express, type Request, type Response } from 'express';
import { errorHandler } from './middleware/errorHandler.ts';
import { requestLogger } from './middleware/requestLogger.ts';

const app: Express = express();

app.use(express.json());
app.use(requestLogger);

app.get('/health', (_request: Request, response: Response) => {
  response.send({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler must be the last middleware
app.use(errorHandler);

export default app;
