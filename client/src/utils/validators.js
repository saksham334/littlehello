// validators.js — quick checks in the BROWSER for instant feedback.
// They mirror the server's zod rules (Milestone 6B), but the SERVER is the real judge:
// anything these miss, the server still catches, and its message is shown instead.
// Each function returns an error message, or '' if the value is fine.

export const PASSWORD_MIN = 12;
export const MINIMUM_AGE = 18;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_CHARACTERS = /^[a-z0-9_]+$/;

export function validateEmail(rawValue) {
  const value = rawValue.trim();
  if (!value) return 'Please enter your email.';
  if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address, like name@example.com.';
  return '';
}

export function validateUsername(rawValue) {
  const value = rawValue.trim().toLowerCase();
  if (!value) return 'Please choose a username.';
  if (value.length < 3) return 'Usernames need at least 3 characters.';
  if (value.length > 20) return 'Usernames can be up to 20 characters.';
  if (!USERNAME_CHARACTERS.test(value)) return 'Use only letters, numbers and underscores (_).';
  return '';
}

export function validateNewPassword(value) {
  if (!value) return 'Please choose a password.';
  if (value.length < PASSWORD_MIN) {
    return `Use at least ${PASSWORD_MIN} characters. A short phrase like “tea under the willow” works well.`;
  }
  if (value.length > 64) return 'Passwords can be up to 64 characters.';
  return '';
}

// Age in whole years from a "YYYY-MM-DD" string (same logic as the server's age.js).
function calculateAge(dateString) {
  const birth = new Date(`${dateString}T00:00:00.000Z`);
  if (Number.isNaN(birth.getTime())) return NaN;
  const today = new Date();
  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birth.getUTCDate())) age -= 1;
  return age;
}

export function validateBirthDate(value) {
  if (!value) return 'Please enter your birth date.';
  const age = calculateAge(value);
  if (Number.isNaN(age)) return 'Please enter a valid date.';
  if (age < MINIMUM_AGE) return `LittleHello is for adults aged ${MINIMUM_AGE} and over.`;
  if (age > 120) return 'Please check the year of your birth date.';
  return '';
}

// The latest birth date allowed today, used as the date picker's "max".
export function latestAllowedBirthDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - MINIMUM_AGE);
  return date.toISOString().slice(0, 10);
}