// password.js — hashing and checking passwords with bcrypt.
// Plain-text passwords are NEVER stored or logged anywhere.
import bcrypt from 'bcrypt'; // or: import bcrypt from 'bcryptjs';

// Cost factor: each +1 doubles the work. 12 ≈ a few hundred milliseconds per hash:
// unnoticeable for one login, but painfully slow for an attacker guessing millions.
const SALT_ROUNDS = 12;

export function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS); // salt is generated and stored inside the hash
}

export function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash); // resolves to true or false
}