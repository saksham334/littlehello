// profileController.js — what happens for each /api/profiles route.
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { getOrCreateProfile } from '../services/profileService.js';
import { toPublicProfile } from '../utils/publicProfile.js';
import {
  INTERESTS,
  AVATARS,
  LANGUAGES,
  CONVERSATION_STYLES,
  FRIENDSHIP_GOALS,
  COMMUNITIES,
  SOCIAL_ENERGY,
  HELLO_PERMISSIONS,
  PHOTO_VISIBILITY,
  PROFILE_LIMITS,
} from '../constants/profileOptions.js';

// One message for every "you can't see this" case, so hidden profiles look like missing ones.
function profileNotFound() {
  return new AppError(404, 'We couldn’t find that profile. It may be hidden or no longer available.');
}

// ---- GET /api/profiles/options (public) -----------------------------------
export function getProfileOptions(req, res) {
  // These lists rarely change: let browsers reuse them for an hour.
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({
    interests: INTERESTS,
    avatars: AVATARS,
    languages: LANGUAGES,
    conversationStyles: CONVERSATION_STYLES,
    friendshipGoals: FRIENDSHIP_GOALS,
    communities: COMMUNITIES,
    socialEnergy: SOCIAL_ENERGY,
    helloPermissions: HELLO_PERMISSIONS,
    photoVisibility: PHOTO_VISIBILITY,
    limits: PROFILE_LIMITS,
  });
}

// ---- GET /api/profiles/me ---------------------------------------------------
export async function getMyProfile(req, res) {
  const profile = await getOrCreateProfile(req.user._id);
  res.json({ profile: profile.toJSON() }); // the owner sees everything, including privacy settings
}

// ---- GET /api/profiles/me/public (preview what others see) -------------------
export async function getMyPublicProfile(req, res) {
  const profile = await getOrCreateProfile(req.user._id);
  res.json({ profile: toPublicProfile(profile) });
}

// ---- PATCH /api/profiles/me -------------------------------------------------
export async function updateMyProfile(req, res) {
  const { privacy, socialEnergy, ...fields } = req.validated.body;
  const profile = await getOrCreateProfile(req.user._id);

  // Simple fields: copy each one that was sent. null means "clear it".
  for (const [key, value] of Object.entries(fields)) {
    profile[key] = value === null ? undefined : value;
  }

  // Privacy: merge only the settings that were sent.
  if (privacy) {
    Object.assign(profile.privacy, privacy);
  }

  // Social energy: store the level with the time it was set (never a streak).
  if (socialEnergy !== undefined) {
    profile.socialEnergy = socialEnergy === null ? undefined : { level: socialEnergy, updatedAt: new Date() };
  }

  // A finished profile must keep at least one interest, or nobody could find it.
  if (profile.isComplete && profile.interests.length === 0) {
    throw new AppError(400, 'A few details need a little fix.', {
      interests: 'Please keep at least one interest so people with similar interests can find you.',
    });
  }

  await profile.save(); // the model's own rules run here too (second safety layer)
  res.json({ profile: profile.toJSON() });
}

// ---- GET /api/profiles/:profileId -------------------------------------------
export async function getProfileById(req, res) {
  const { profileId } = req.validated.params;
  const profile = await Profile.findById(profileId);
  if (!profile) throw profileNotFound();

  const isOwner = profile.user.equals(req.user._id);

  if (!isOwner) {
    // Not finished onboarding, or hidden from Discover → looks the same as "doesn't exist".
    // (Milestone 13: accepted connections will still be able to see hidden profiles.)
    if (!profile.isComplete || !profile.privacy.discoverable) throw profileNotFound();

    // The account behind it must still be active (not suspended or deleted).
    const ownerIsActive = await User.exists({ _id: profile.user, accountStatus: 'active' });
    if (!ownerIsActive) throw profileNotFound();

    // Milestone 15: if either person has blocked the other → profileNotFound() too.
  }

  res.json({ profile: toPublicProfile(profile), isOwner });
}