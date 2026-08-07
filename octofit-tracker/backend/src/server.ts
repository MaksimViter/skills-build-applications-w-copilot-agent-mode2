import express from 'express';
import './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit backend is running',
    apiBaseUrl,
    health: `${apiBaseUrl}/api/health`,
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', port: PORT, apiBaseUrl });
});

app.get('/api/users', (_req, res) => {
  res.json({
    apiBaseUrl,
    users: [
      { id: 'u1', name: 'Ava Chen', team: 'Summit Striders' },
      { id: 'u2', name: 'Noah Patel', team: 'Iron Pulse' },
    ],
  });
});

app.get('/api/activities', (_req, res) => {
  res.json({
    apiBaseUrl,
    activities: [
      { id: 'a1', type: 'Run', durationMin: 32, calories: 298 },
      { id: 'a2', type: 'Strength', durationMin: 44, calories: 352 },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
});
