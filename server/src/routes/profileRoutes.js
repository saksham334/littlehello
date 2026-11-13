// profileRoutes.js — /api/profiles/*
import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema, profileIdParamsSchema } from '../validation/profileSchemas.js';
import {
  getProfileOptions,
  getMyProfile,
  getMyPublicProfile,
  updateMyProfile,
  getProfileById,
} from '../controllers/profileController.js';

const router = Router();

// Public: the option lists aren't secret.
router.get('/options', getProfileOptions);

// Everything below this line requires a logged-in member.
router.use(requireAuth);

router.get('/me', getMyProfile);
router.patch('/me', validate(updateProfileSchema), updateMyProfile);
router.get('/me/public', getMyPublicProfile);

// Must come AFTER the /me routes: otherwise "me" would be treated as a :profileId.
router.get('/:profileId', validate(profileIdParamsSchema, 'params'), getProfileById);

export default router;