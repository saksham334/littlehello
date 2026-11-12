// rateLimiters.js — limits how often one visitor (by IP address) can call the API.
// Protects against password guessing, spam sign-ups and request floods.
import rateLimit from 'express-rate-limit';

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

// Shared settings: modern RateLimit headers, friendly JSON messages.
const shared = {
  standardHeaders: 'draft-7', // sends a "RateLimit" header telling clients how many requests remain
  legacyHeaders: false,       // drops the old X-RateLimit-* headers
};

// Every /api request: a generous safety net against floods.
export const apiLimiter = rateLimit({
  ...shared,
  windowMs: FIFTEEN_MINUTES,
  limit: 300,
  message: { error: 'You’re moving a little fast. Please take a short break and try again in a few minutes.' },
});

// Login: only FAILED attempts count, so normal people are never blocked.
export const loginLimiter = rateLimit({
  ...shared,
  windowMs: FIFTEEN_MINUTES,
  limit: 10,
  skipSuccessfulRequests: true, // a successful login (status < 400) isn't counted
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again. Your account is safe.' },
});

// Register: people sign up once; scripts sign up hundreds of times.
export const registerLimiter = rateLimit({
  ...shared,
  windowMs: ONE_HOUR,
  limit: 5,
  message: { error: 'Too many sign-ups from this connection. Please try again in an hour.' },
});