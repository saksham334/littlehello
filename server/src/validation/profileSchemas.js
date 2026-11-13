// profileSchemas.js — what a valid profile update / profile link looks like.
import { z } from 'zod';
import {
  AVATAR_IDS,
  INTEREST_IDS,
  LANGUAGE_IDS,
  CONVERSATION_STYLE_IDS,
  FRIENDSHIP_GOAL_IDS,
  COMMUNITY_IDS,
  SOCIAL_ENERGY_IDS,
  HELLO_PERMISSION_IDS,
  PHOTO_VISIBILITY_IDS,
  PROFILE_LIMITS as LIMITS,
} from '../constants/profileOptions.js';

// No angle brackets or invisible control characters in names.
// (React already displays text safely; this just keeps names clean and readable.)
const CLEAN_TEXT = /^[^<>\p{Cc}]*$/u;
// Pronouns: letters (any language), spaces, slashes, hyphens, apostrophes. Empty clears them.
const PRONOUNS_PATTERN = /^[\p{L}\s/'-]*$/u;

// A list of choices from an allowed list: max size, no duplicates, friendly messages.
function choiceList(allowedIds, max, label) {
  return z
    .array(z.enum(allowedIds, { error: `That isn’t one of the ${label} options.` }), {
      error: `Please send a list of ${label}.`,
    })
    .max(max, `Please choose up to ${max} ${label}.`)
    .refine((list) => new Set(list).size === list.length, 'Each choice can only be picked once.');
}

// PATCH /api/profiles/me: every field is optional, so people can update one thing at a time.
// Fields NOT listed here (user, isComplete, createdAt...) are silently dropped: no mass assignment.
export const updateProfileSchema = z
  .object({
    displayName: z
      .string({ error: 'Please enter a display name.' })
      .trim()
      .min(1, 'Please enter a display name.')
      .max(LIMITS.displayNameMax, `Display names can be up to ${LIMITS.displayNameMax} characters.`)
      .regex(CLEAN_TEXT, 'Please use only regular letters, numbers and punctuation.')
      .optional(),

    pronouns: z
      .string()
      .trim()
      .max(LIMITS.pronounsMax, `Pronouns can be up to ${LIMITS.pronounsMax} characters.`)
      .regex(PRONOUNS_PATTERN, 'Pronouns can use letters, spaces, slashes and hyphens, like “she/her”.')
      .optional(),

    avatar: z.enum(AVATAR_IDS, { error: 'Please choose one of the avatars.' }).optional(),

    bio: z
      .string()
      .trim()
      .max(LIMITS.bioMax, `Your introduction can be up to ${LIMITS.bioMax} characters.`)
      .regex(CLEAN_TEXT, 'Please remove any unusual characters.')
      .optional(),

    interests: choiceList(INTEREST_IDS, LIMITS.interestsMax, 'interests').optional(),
    languages: choiceList(LANGUAGE_IDS, LIMITS.languagesMax, 'languages').optional(),
    friendshipGoals: choiceList(FRIENDSHIP_GOAL_IDS, LIMITS.goalsMax, 'friendship goals').optional(),
    communities: choiceList(COMMUNITY_IDS, LIMITS.communitiesMax, 'community spaces').optional(),

    // null = "clear my choice"
    conversationStyle: z.enum(CONVERSATION_STYLE_IDS, { error: 'Please choose one of the chat styles.' }).nullable().optional(),
    socialEnergy: z.enum(SOCIAL_ENERGY_IDS, { error: 'Please choose one of the energy options.' }).nullable().optional(),

    // Privacy: send only the settings you want to change.
    privacy: z
      .object({
        discoverable: z.boolean(),
        showPronouns: z.boolean(),
        showCommunities: z.boolean(),
        showSocialEnergy: z.boolean(),
        whoCanSayHello: z.enum(HELLO_PERMISSION_IDS),
        photoVisibility: z.enum(PHOTO_VISIBILITY_IDS),
      })
      .partial()
      .optional(),
  })
  .refine((updates) => Object.keys(updates).length > 0, {
    error: 'There’s nothing to update yet.',
  });

// GET /api/profiles/:profileId: MongoDB ids are 24 hexadecimal characters.
export const profileIdParamsSchema = z.object({
  profileId: z.string().regex(/^[a-f\d]{24}$/i, 'That profile link doesn’t look right.'),
});