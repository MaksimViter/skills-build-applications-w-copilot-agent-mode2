import express from 'express';
import './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit backend is running', health: '/api/health' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', port: PORT });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
});
