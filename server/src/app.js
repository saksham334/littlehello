// app.js — builds and configures the Express application.
// It does NOT start listening on a port; server.js does that.

import express from 'express';
import { getDatabaseStatus } from './config/db.js';

const app = express();

// Hide the "X-Powered-By: Express" header so we don't advertise our tech stack.
app.disable('x-powered-by');

// Parse JSON request bodies into req.body (max 10kb, a cheap defense against abuse).
app.use(express.json({ limit: '10kb' }));

// ---- Routes ---------------------------------------------------------------

// Health check: is the API alive, and is the database connected?
// Returns 503 ("Service Unavailable") if the database is down, so hosting
// providers know something is wrong.
app.get('/api/health', (req, res) => {
  const database = getDatabaseStatus();
  const healthy = database === 'connected';

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    message: healthy
      ? 'A little hello from the LittleHello API 🌸'
      : 'The API is running, but the database isn’t connected right now.',
    ...(healthy ? {} : { error: 'The database isn’t connected right now. Please try again soon.' }),
    database,
    time: new Date().toISOString(),
  });
});

// Practice route from Milestone 1
const supportPhrases = [
  'Friendship, at your own pace.',
  "You don't have to be loud to belong.",
  'A little hello can go a long way.',
  'No pressure. Just people.',
  'Take your time. Find your people.',
];

app.get('/api/hello', (req, res) => {
  const phrase = supportPhrases[Math.floor(Math.random() * supportPhrases.length)];
  res.json({ phrase });
});

// ---- 404 for unknown API routes -------------------------------------------
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'We couldn’t find that page. It may have wandered off. 🌼' });
});

// ---- Central error handler ------------------------------------------------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'That request wasn’t valid JSON.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'That request was too large.' });
  }
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Something went wrong on our side. Please try again soon.' });
});

export default app;