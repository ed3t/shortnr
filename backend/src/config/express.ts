import express, { Application, Request, Response, NextFunction } from 'express';
import encodeRoute from '@app/routes/encode';
import decodeRoute from '@app/routes/decode';
import statsRoute from '@app/routes/statistic';
import listRoute from '@app/routes/list';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { config } from '@config/config';
import { AppError } from '@app/types/error';

const createServer = (): Application => {
  const app = express();

  const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
  };

  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: 'Too many requests. Try again later',
  });

  // Middleware
  app.use(cors(corsOptions));
  app.use(limiter);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Routes
  app.use('/api/encode', encodeRoute);
  app.use('/api/decode', decodeRoute);
  app.use('/api/statistic', statsRoute);
  app.use('/api/list', listRoute);

  app.get('/api', (_req, res) => {
    res.send('Running! 🚀');
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status ?? 500;
    const message = err.message ?? 'Something went wrong!';
    res.status(status).json({
      success: false,
      status,
      message,
      stack: config.environment !== 'local' ? undefined : err.stack,
    });
  });

  app.disable('x-powered-by');

  return app;
};

export { createServer };
