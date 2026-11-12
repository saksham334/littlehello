// client.js — the ONE place where the frontend talks to the backend.

// Event name broadcast when the server says "you're not logged in" (401).
// AuthProvider listens for it and clears the user, so the app updates everywhere.
export const UNAUTHORIZED_EVENT = 'littlehello:unauthorized';

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;   // HTTP status code, or 0 if the server was unreachable
    this.details = details; // per-field messages, e.g. { email: '…' } (from zod, Milestone 6B)
  }
}

export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  let response;

  try {
    response = await fetch(`/api${path}`, {
      method,
      credentials: 'include', // send the session cookie (we never use localStorage for auth)
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('We couldn’t reach LittleHello. Please check your connection and try again.', 0);
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    // A 401 from anything except the auth routes means the session ended
    // (expired, logged out in another tab, or account removed).
    if (response.status === 401 && !path.startsWith('/auth/')) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    throw new ApiError(
      data?.error || 'Something went wrong. Please try again.',
      response.status,
      data?.details,
    );
  }

  return data;
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => apiRequest(path, { ...options, method: 'DELETE' }),
};