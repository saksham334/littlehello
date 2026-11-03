// env.js — reads and checks environment variables ONCE, when the server starts.
// Every other file imports settings from here instead of reading process.env directly.
// Benefits: one place to see every setting, and a clear error if something is missing.

const REQUIRED = ['MONGODB_URI'];

// Find any required variables that are missing or empty.
const missing = REQUIRED.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`❌ Missing required environment variable(s): ${missing.join(', ')}`);
  console.error('   Copy server/.env.example to server/.env and fill in the values.');
  process.exit(1); // stop now: the app can't work without these
}

// Object.freeze makes the settings read-only, so no code can change them by accident.
export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGODB_URI,
});