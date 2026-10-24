// app.js — builds and configures the Express application.
// It does NOT start listening on a port; server.js does that.
// Keeping them separate lets automated tests import the app directly.

import express from 'express';

const app = express();

// Hide the "X-Powered-By: Express" header so we don't advertise our tech stack
// to anyone probing for known vulnerabilities.
app.disable('x-powered-by');

// Parse JSON request bodies (e.g. login forms) into req.body.
// The 10kb limit rejects oversized payloads, which is a cheap defense against abuse.
app.use(express.json({ limit: '10kb' }));

// ---- Routes ---------------------------------------------------------------

// Health check: a simple "are you alive?" endpoint.
// Hosting providers and our own testing will call this.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'A little hello from the LittleHello API 🌸',
    time: new Date().toISOString(),
  });
});

// ---- 404 for unknown API routes -------------------------------------------

// If no route above matched a path starting with /api, reply with a JSON 404.
// (Later, non-API paths will be handled by the React app in production.)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'We couldn’t find that page. It may have wandered off. 🌼' });
});

// ---- Central error handler ------------------------------------------------

// Express recognizes an error handler by its FOUR parameters (err, req, res, next).
// Any error thrown in a route, including inside async functions in Express 5, ends up here.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Malformed JSON in a request body: the client's fault, so 400 Bad Request.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'That request wasn’t valid JSON.' });
  }

  // Payload larger than our 10kb limit.
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'That request was too large.' });
  }

  // Anything else is unexpected: log the details for us, but never leak them to users.
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Something went wrong on our side. Please try again soon.' });
});

export default app;