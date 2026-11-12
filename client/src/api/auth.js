// auth.js — API calls for accounts. Each returns a Promise.
// Errors arrive as ApiError, with .details for per-field messages.
import { api } from './client.js';

// POST /api/auth/register → { user }   (also logs you in)
export function registerAccount(details) {
  return api.post('/auth/register', details);
}

// POST /api/auth/login → { user }
export function loginAccount(credentials) {
  return api.post('/auth/login', credentials);
}

// POST /api/auth/logout → nothing (204)
export function logoutAccount() {
  return api.post('/auth/logout');
}

// GET /api/auth/me → { user }, or ApiError with status 401 if logged out
export function getCurrentUser(options) {
  return api.get('/auth/me', options);
}