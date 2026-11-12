// authController.js - what happens fpr each auth route.
// Every handler can assume req.validated.body was already checked by zod (6B).
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { getDummyHash, verifyPassword } from '../utils/password.js';
import { startUserSession, endUserSession } from '../utils/sessionHelpers.js';

// One message for "no such email" AND "wrong password", so attackers can't tell them apart.
const LOGIN_FAILED = 'That email and password don’t match. Please try again.';

function duplicateError(field) {
  if (field === 'username') {
    return new AppError(409, 'That username is already taken.', {
      username: 'That username is already taken. Try adding a word or a number.',
    });
  }
  // Gentle wording that doesn't loudly confirm "this person has an account".
  return new AppError(409, 'We couldn’t create an account with that email.', {
    email: 'We couldn’t use that email. If you already have an account, try logging in instead.',
  });
}

// ---- POST /api/auth/register --------------------------------------------
export async function register(req, res) {
  const { email, username, password, birthDate } = req.validated.body;

  // Friendly early check (the unique index below is the real guarantee)
  const existing = await User.findOne({ $or: [{ email }, { username }] })
    .select('email username')
    .lean();
  if (existing) {
    throw duplicateError(existing.email === email ? 'email' : 'username');
  }

  // Build the user from CLEANED fields only, never from raw req.body
  const user = new User({ email, username, birthDate });
  await user.setPassword(password);

  try {
    await user.save();
  } catch (err) {
    // Two people signed up with the same email at the same moment: the index caught it.
    if (err.code === 11000) {
      throw duplicateError(Object.keys(err.keyPattern ?? {})[0]);
    }
    throw err;
  }

  await startUserSession(req, user.id); // signing up also logs you in
  res.status(201).json({ user: user.toJSON() }); // toJSON removes private fields
}

// ---- POST /api/auth/login -------------------------------------------------
export async function login(req, res) {
  const { email, password } = req.validated.body;

  const user = await User.findOne({ email }).select('+passwordHash');

  // Always run bcrypt, even if the user doesn't exist, so both cases take the same time.
  const passwordMatches = user
    ? await user.checkPassword(password)
    : await verifyPassword(password, await getDummyHash());

  if (!user || !passwordMatches) {
    throw new AppError(401, LOGIN_FAILED);
  }

  // Only revealed AFTER the correct password, so only the real owner learns this.
  if (user.accountStatus !== 'active') {
    throw new AppError(403, 'This account is paused right now. Please contact support if you think this is a mistake.');
  }

  await startUserSession(req, user.id);
  res.json({ user: user.toJSON() });
}

// ---- POST /api/auth/logout ------------------------------------------------
export async function logout(req, res) {
  await endUserSession(req, res);
  res.status(204).end(); // 204 = success, nothing to send back
}

// ---- GET /api/auth/me (requires login) -------------------------------------
export function me(req, res) {
  res.json({ user: req.user.toJSON() }); // req.user was set by requireAuth
}