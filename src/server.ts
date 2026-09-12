import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import jobRoutes from './routes/job.routes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Job Analyzer API is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/jobs', jobRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', error);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Job Analyzer server running on http://localhost:${PORT}`);
  });
}

export { app };
