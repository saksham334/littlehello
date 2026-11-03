// server.js — the entry point: check settings → connect to the database → start listening.

import { env } from './config/env.js'; // runs the env checks first
import { connectToDatabase, disconnectFromDatabase } from './config/db.js';
import app from './app.js';

async function start() {
  // 1. Connect to MongoDB BEFORE accepting any requests.
  try {
    await connectToDatabase();
  } catch {
    process.exit(1); // db.js already printed a friendly explanation
  }

  // 2. Only now start the HTTP server.
  const server = app.listen(env.port, () => {
    console.log(`🌸 LittleHello API listening on http://localhost:${env.port}`);
    console.log(`   Health check: http://localhost:${env.port}/api/health`);
  });

  // 3. Graceful shutdown: finish current requests, close the database, then exit.
  //    SIGINT = you pressed Ctrl+C. SIGTERM = a host like Render is stopping the app.
  function shutdown(signal) {
    console.log(`\n${signal} received: closing LittleHello gently…`);
    server.close(async () => {
      await disconnectFromDatabase();
      process.exit(0);
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();