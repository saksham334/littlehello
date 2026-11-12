// requireAuth.js - protects routes that need a logged-in user.
// Usage:  router.get('/me, requireAuth, me);
// After it runs, the controller can use req.user (the full user documents).
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { endUserSession } from '../utils/sessionHelpers.js';

export async function requireAuth(req, res, next) {
  const userId = req.session?.userId;
  if (!userId) {
    throw new AppError(401, 'Please log in to continue.');
  }

  const user = await User.findById(userId);

  // The account was deleted or suspended since they logged in: end the session.
  if (!user || user.accountStatus !== 'active') {
    await endUserSession(req, res);
    throw new AppError(401, 'Please log in to continue.');
  }

  req.user = user;
  next();
}