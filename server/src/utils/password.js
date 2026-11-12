// password.js — hashing and checking passwords with bcrypt.
// Plain-text passwords are NEVER stored or logged anywhere.
import bcrypt from 'bcrypt'; // or: import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

// A hash of a password nobody uses. When someone logs in with an email that
// doesn't exist, we still run bcrypt against this, so the response takes the
// same time as a wrong password. Otherwise attackers could time responses to
// discover which emails have accounts.
let dummyHashPromise;
export function getDummyHash() {
  dummyHashPromise ??= hashPassword('this-is-not-a-real-account-password');
  return dummyHashPromise; // created once, then reused
}