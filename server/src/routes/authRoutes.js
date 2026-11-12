// authRoutes.js — URL → middleware → controller wiring for /api/auth/*
// Order on each line: rate limit → validate → controller.
import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiters.js';
import { registerSchema, loginSchema } from '../validation/authSchemas.js';
import { register, login, logout, me } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/login', loginLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

export default router;