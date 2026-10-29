// client.js - the ONE place where the frontend talks to the backend.
// Every other API files uses these helpers, so error handling and cookies are handled consistently everywhere.

// A custom error type so pages can read err. status (e.g. 401 = not logged in) and err.message (e.g. "You must be logged in to do that").
export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;   // HTTP status code, or 0 if the server was unreachable
    this.details = details; // optional extra info (e.g. field validation errors later)
  }
}

export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  let response;

  try {
    response = await fetch(`/api${path}`, {
      method,
      // Send the session cookie with every request (needed from Milestone 6).
      // We never put tokens in localStorage.
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal, // lets a page cancel a request it no longer needs
    });
  } catch (err) {
    // A cancelled request isn't a real error, so pass it through untouched.
    if (err.name === 'AbortError') throw err;
    // fetch only throws for network problems (server down, Wi-Fi off).
    throw new ApiError('We couldn’t reach LittleHello. Please check your connection and try again.', 0);
  }

  // Only parse JSON if the server actually sent JSON.
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  // fetch does NOT throw on 400/500 responses, so we check response.ok ourselves.
  if (!response.ok) {
    throw new ApiError(
      data?.error || 'Something went wrong. Please try again.',
      response.status,
      data?.details,
    );
  }

  return data;
}

// Short helpers: api.get('/health'), api.post('/auth/login', { ... }), etc.
export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => apiRequest(path, { ...options, method: 'DELETE' }),
};