// db.js — connects to MongoDB with Mongoose and reports the connection status.
import mongoose from 'mongoose';
import { env } from './env.js';

// Only allow queries on fields that exist in our schemas.
// Unknown fields in a filter are ignored instead of being passed to MongoDB.
mongoose.set('strictQuery', true);

// Turns technical driver errors into messages a person can act on.
function explainConnectionError(err) {
  const message = err?.message ?? '';

  if (/bad auth|authentication failed/i.test(message)) {
    return 'Wrong database username or password. Check MONGODB_URI in server/.env (the DATABASE user, not your Atlas login).';
  }
  if (/querySrv|ENOTFOUND/i.test(message)) {
    return 'Could not find the cluster address. Check the part after "@" in MONGODB_URI, and your internet connection.';
  }
  if (/whitelist|IP that isn't|timed out|Server selection/i.test(message)) {
    return 'Timed out reaching the cluster. Is your current IP address added in Atlas → Network Access?';
  }
  if (/Invalid scheme|Invalid connection string/i.test(message)) {
    return 'MONGODB_URI looks malformed. It should start with mongodb+srv://';
  }
  return message; // unknown problem: show the original message
}

export async function connectToDatabase() {
  // Log connection changes after startup (e.g. Wi-Fi drops, Atlas maintenance).
  mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected'));
  mongoose.connection.on('reconnected', () => console.log('🔁 MongoDB reconnected'));

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10_000, // give up after 10 seconds instead of the default 30
    });
    console.log(`🍃 Connected to MongoDB (database: "${mongoose.connection.name}")`);
  } catch (err) {
    console.error('❌ Could not connect to MongoDB.');
    console.error(`   ${explainConnectionError(err)}`);
    throw err; // let server.js decide what to do (it will stop the server)
  }
}

// Mongoose stores the state as a number; we translate it into a word.
const STATES = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

export function getDatabaseStatus() {
  return STATES[mongoose.connection.readyState] ?? 'unknown';
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  console.log('🍃 MongoDB connection closed');
}