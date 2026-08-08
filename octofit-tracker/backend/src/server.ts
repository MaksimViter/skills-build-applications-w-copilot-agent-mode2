import express from 'express';
import './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (_req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

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
      {
        id: 'a3',
        type: 'Manga Maniacs',
        description:
          'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
        schedule: 'Tuesdays at 7pm',
        maxAttendance: 15,
      },
    ],
  });
});

app.get('/api/teams', (_req, res) => {
  res.json({
    apiBaseUrl,
    teams: [
      { id: 't1', name: 'Summit Striders', memberCount: 8 },
      { id: 't2', name: 'Iron Pulse', memberCount: 6 },
    ],
  });
});

app.get('/api/leaderboard', (_req, res) => {
  res.json({
    apiBaseUrl,
    leaderboard: [
      { id: 'l1', rank: 1, name: 'Summit Striders', score: 1280 },
      { id: 'l2', rank: 2, name: 'Iron Pulse', score: 1195 },
      { id: 'l3', rank: 3, name: 'Cardio Crew', score: 1102 },
    ],
  });
});

app.get('/api/workouts', (_req, res) => {
  res.json({
    apiBaseUrl,
    workouts: [
      { id: 'w1', name: 'Power Intervals', durationMin: 35 },
      { id: 'w2', name: 'Core and Mobility', durationMin: 24 },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
});
