// app.js — builds and configures the Express application.
// It does NOT start listening on a port; server.js does that.
import express from 'express';
import { env } from './config/env.js';
import { getDatabaseStatus } from './config/db.js';
import { sessionMiddleware } from './config/session.js';
import { AppError } from './utils/AppError.js';
import authRoutes from './routes/authRoutes.js';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimiters.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

app.disable('x-powered-by');

// In production we'll run behind Render's HTTPS proxy. This tells Express to trust it,
// so secure cookies work. (Not needed on localhost.)
if (env.isProduction) {
  app.set('trust proxy', 1);
}

// Security headers on every response (content security policy, clickjacking
// protection, no MIME sniffing, HSTS, and more). One line, many protections.
app.use(helmet());

// Rate-limit every API request BEFORE parsing bodies or touching the database,
// so floods are rejected as cheaply as possible.
app.use('/api', apiLimiter);

app.use(express.json({ limit: '10kb' }));
app.use(sessionMiddleware); // must come BEFORE any route that uses req.session

// ---- Routes ---------------------------------------------------------------
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

const supportPhrases = [
  'Friendship, at your own pace.',
  "You don't have to be loud to belong.",
  'A little hello can go a long way.',
  'No pressure. Just people.',
  'Take your time. Find your people.',
];
app.get('/api/hello', (req, res) => {
  res.json({ phrase: supportPhrases[Math.floor(Math.random() * supportPhrases.length)] });
});

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes); // NEW

// ---- 404 for unknown API routes -------------------------------------------
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'We couldn’t find that page. It may have wandered off. 🌼' });
});

// ---- Central error handler ------------------------------------------------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Our own friendly errors
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // A Mongoose model rule failed (second safety layer behind zod)
  if (err.name === 'ValidationError') {
    const details = Object.fromEntries(Object.entries(err.errors).map(([field, e]) => [field, e.message]));
    return res.status(400).json({ error: 'A few details need a little fix.', details });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'That request wasn’t valid JSON.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'That request was too large.' });
  }

  // Anything else is unexpected: log details for us, never leak them to users.
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Something went wrong on our side. Please try again soon.' });
});

export default app;