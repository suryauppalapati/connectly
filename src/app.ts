import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler.ts';
import { requestLogger } from './middleware/requestLogger.ts';
import { v1Router } from './routes/v1/index.ts';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use('/api/v1', v1Router);

app.get('/health', (_request: Request, response: Response) => {
  response.send({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
