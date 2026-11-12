// session.js — session and cookie settings, stored in MongoDB.
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { env } from './env.js';

export const SESSION_COOKIE_NAME = 'lh.sid';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// Shared by the session cookie and by clearCookie() at logout (they must match).
export const baseCookieOptions = {
  httpOnly: true,            // JavaScript in the browser can't read it
  sameSite: 'lax',           // not sent on background requests started by other websites
  secure: env.isProduction,  // HTTPS-only in production (localhost uses plain http)
  path: '/',
};

export const sessionMiddleware = session({
  name: SESSION_COOKIE_NAME,  // a neutral name, not the default "connect.sid" that reveals our tech
  secret: env.sessionSecret,  // signs the cookie so tampering is detected
  resave: false,              // don't re-save sessions that didn't change
  saveUninitialized: false,   // no cookie at all until someone logs in (privacy!)
  rolling: true,              // each visit restarts the 7-day timer: active people stay logged in
  store: MongoStore.create({
    mongoUrl: env.mongoUri,
    collectionName: 'sessions',
    ttl: SEVEN_DAYS_MS / 1000,  // MongoDB deletes expired sessions automatically (seconds)
    touchAfter: 24 * 60 * 60,   // refresh the expiry in the database at most once a day
  }),
  cookie: { ...baseCookieOptions, maxAge: SEVEN_DAYS_MS },
});