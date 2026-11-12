// AppError.js — an error with a status code and a friendly message for the user.
// Throw it anywhere in a route:   throw new AppError(401, 'Please log in to continue.');
// The central error handler in app.js turns it into a JSON response.
export class AppError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'AppError';
    this.status = status;   // HTTP status code, e.g. 400, 401, 409
    this.details = details; // optional per-field messages, e.g. { email: '…' }
  }
}