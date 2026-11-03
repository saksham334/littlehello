// fields.js — reusable validation rules for single fields.
// Each rule cleans the value AND checks it, with a friendly message per problem.
// The server is the source of truth: the React forms (Milestone 7) will mirror
// some of these rules for instant feedback, but these are the ones that count.
import { z } from 'zod';
import { calculateAge, MINIMUM_AGE, MAXIMUM_AGE } from '../utils/age.js';

// ---- Shared settings ----------------------------------------------------------
export const PASSWORD_MIN = 12;
export const PASSWORD_MAX = 64; // bcrypt only uses the first 72 bytes, so we stay below that

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_CHARACTERS = /^[a-z0-9_]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/; // "YYYY-MM-DD", the format <input type="date"> sends

// Names people shouldn't be able to claim (to prevent impersonating staff, or confusion)
const RESERVED_USERNAMES = new Set([
  'admin', 'administrator', 'moderator', 'mod', 'support', 'help', 'staff',
  'littlehello', 'official', 'system', 'root', 'api', 'me', 'null', 'undefined',
]);

// A tiny starter list. Real apps check much larger lists of leaked passwords.
const COMMON_PASSWORDS = new Set([
  'password1234', 'password12345', '123456789012', 'qwertyuiop12', 'iloveyou1234',
  'letmein12345', 'welcome12345', 'littlehello1', 'littlehello123', 'abcdefghijkl',
]);

// "2001-02-30" matches the pattern but isn't a real day. This catches it:
// JavaScript silently rolls Feb 30 over to Mar 2, so the text won't match anymore.
function isRealCalendarDate(value) {
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// ---- Email ----------------------------------------------------------------------
export const emailField = z
  .string({ error: 'Please enter your email.' })
  .trim()
  .toLowerCase()
  .min(1, 'Please enter your email.')
  .max(254, 'That email is too long.')
  .regex(EMAIL_PATTERN, 'Please enter a valid email address, like name@example.com.');

// ---- Username -------------------------------------------------------------------
export const usernameField = z
  .string({ error: 'Please choose a username.' })
  .trim()
  .toLowerCase()
  .min(3, 'Usernames need at least 3 characters.')
  .max(20, 'Usernames can be up to 20 characters.')
  .regex(USERNAME_CHARACTERS, 'Use only letters, numbers and underscores (_).')
  .refine((value) => !RESERVED_USERNAMES.has(value), 'That username is reserved. Please choose another one.');

// ---- New password (sign-up, and later "change password") ----------------------
// Note: we NEVER trim passwords. A space can be a deliberate part of a passphrase.
export const newPasswordField = z
  .string({ error: 'Please choose a password.' })
  .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters. A short phrase like “tea under the willow” works well.`)
  .max(PASSWORD_MAX, `Passwords can be up to ${PASSWORD_MAX} characters.`)
  .refine((value) => Buffer.byteLength(value, 'utf8') <= 72, 'That password is a little too long. Please shorten it.')
  .refine((value) => !COMMON_PASSWORDS.has(value.toLowerCase()), 'That password is very common. Try a phrase only you would think of.');

// ---- Birth date -----------------------------------------------------------------
// Each later check first confirms the earlier ones passed, so people only see
// the ONE message that actually explains their problem.
export const birthDateField = z
  .string({ error: 'Please enter your birth date.' })
  .regex(DATE_PATTERN, 'Please use the format YYYY-MM-DD.')
  .refine((value) => !DATE_PATTERN.test(value) || isRealCalendarDate(value), 'That date doesn’t exist. Could you check it?')
  .refine(
    (value) => !isRealCalendarDate(value) || calculateAge(`${value}T00:00:00.000Z`) >= MINIMUM_AGE,
    `LittleHello is for adults aged ${MINIMUM_AGE} and over.`,
  )
  .refine(
    (value) => !isRealCalendarDate(value) || calculateAge(`${value}T00:00:00.000Z`) <= MAXIMUM_AGE,
    'Please check the year of your birth date.',
  )
  // Once valid, turn the text into a real Date (midnight UTC) for the database.
  .transform((value) => new Date(`${value}T00:00:00.000Z`));