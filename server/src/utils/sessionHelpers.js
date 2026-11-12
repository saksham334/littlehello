// sessionHelpers.js — start and end a logged-in session safely.
// express-session uses old-style callbacks; these wrap them in Promises so we can use await.
import { SESSION_COOKIE_NAME, baseCookieOptions } from '../config/session.js';

function run(fn) {
  return new Promise((resolve, reject) => fn((err) => (err ? reject(err) : resolve())));
}

export async function startUserSession(req, userId) {
  // New session ID on every login, so a session ID planted before login is useless
  // (this blocks an attack called "session fixation").
  await run((done) => req.session.regenerate(done));
  req.session.userId = userId; // the ONLY thing we store: no email, no password
  await run((done) => req.session.save(done)); // make sure it's saved before we reply
}

export async function endUserSession(req, res) {
  if (req.session) {
    await run((done) => req.session.destroy(done)); // delete it from MongoDB
  }
  res.clearCookie(SESSION_COOKIE_NAME, baseCookieOptions); // and tell the browser to forget it
}