import express, { Application, Request, Response, NextFunction } from 'express';
import { config } from '@config/config';
import { AppError } from '@app/types/error';

const createServer = (): Application => {
  const app = express();

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Routes
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
