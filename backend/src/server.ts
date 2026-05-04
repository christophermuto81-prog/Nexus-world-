import express from 'express';
import cors from 'cors';
import { config } from './config';
import healthRouter from './routes/health';
import enginesRouter from './routes/engines';
import walletRouter from './routes/wallet';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/engines', enginesRouter);
app.use('/api/wallet', walletRouter);

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'Nexus World API',
    version: '1.0.0',
    docs: '/api/health',
    engines: '/api/engines',
    wallet: '/api/wallet',
  });
});

app.listen(config.port, () => {
  console.log(`[Nexus World] Backend running on port ${config.port}`);
  console.log(`[Nexus World] Environment: ${config.nodeEnv}`);
  console.log(`[Nexus World] God Core: OPERATIONAL`);
});

export default app;
