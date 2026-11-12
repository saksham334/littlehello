// env.js — reads and checks environment variables ONCE, when the server starts.
// Every other file imports settings from here instead of reading process.env directly.

const REQUIRED = ['MONGODB_URI', 'SESSION_SECRET'];

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variable(s): ${missing.join(', ')}`);
  console.error('   Copy server/.env.example to server/.env and fill in the values.');
  process.exit(1);
}

// A short secret is easy to guess, which would let attackers forge cookies.
if (process.env.SESSION_SECRET.length < 32) {
  console.error('❌ SESSION_SECRET is too short (needs at least 32 characters).');
  console.error('   Generate one: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
  process.exit(1);
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
});