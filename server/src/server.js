// server.js — the entry point. Imports the configured app and starts listening.

import app from './app.js'; // ".js" is required with ES modules in Node

// Environment variables are always strings, so convert PORT to a number.
// Fall back to 4000 if PORT isn't set.
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`🌸 LittleHello API listening on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});