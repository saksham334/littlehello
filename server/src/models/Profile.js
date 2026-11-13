// Profile.js — what OTHER people can (potentially) see: who you are, what you love,
// how you like to chat, plus your privacy choices.
// Private account data (email, password, birth date) stays in the User model.
import mongoose from 'mongoose';
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

// ---- Reusable array rules ----------------------------------------------------
function maxItems(limit, label) {
  return {
    validator: (list) => list.length <= limit,
    message: `Please choose up to ${limit} ${label}.`,
  };
}
const noDuplicates = {
  validator: (list) => new Set(list).size === list.length, // a Set removes duplicates
  message: 'Each choice can only be picked once.',
};

// ---- Privacy settings (stored inside the profile) -----------------------------
// _id: false = this is part of a profile, not a separate document with its own id.
const privacySchema = new mongoose.Schema(
  {
    discoverable: { type: Boolean, default: true },      // show me in Discover
    showPronouns: { type: Boolean, default: true },
    showCommunities: { type: Boolean, default: false },  // private by default
    showSocialEnergy: { type: Boolean, default: false }, // private by default
    whoCanSayHello: { type: String, enum: HELLO_PERMISSION_IDS, default: 'everyone' },
    photoVisibility: { type: String, enum: PHOTO_VISIBILITY_IDS, default: 'nobody' }, // future bonus feature
  },
  { _id: false },
);

// ---- The profile ----------------------------------------------------------------
const profileSchema = new mongoose.Schema(
  {
    // Which account this profile belongs to. unique = exactly one profile per user.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Optional until onboarding (Milestone 9) asks for it.
    displayName: {
      type: String,
      trim: true,
      maxlength: [LIMITS.displayNameMax, `Display names can be up to ${LIMITS.displayNameMax} characters.`],
    },
    pronouns: {
      type: String,
      trim: true,
      maxlength: [LIMITS.pronounsMax, `Pronouns can be up to ${LIMITS.pronounsMax} characters.`],
    },
    avatar: { type: String, enum: AVATAR_IDS, default: 'flower' },
    bio: {
      type: String,
      trim: true,
      default: '',
      maxlength: [LIMITS.bioMax, `Your introduction can be up to ${LIMITS.bioMax} characters.`],
    },

    // Arrays of ids: each item must be in the allowed list (enum),
    // and the whole list has a size limit and no duplicates.
    interests: {
      type: [{ type: String, enum: INTEREST_IDS }],
      default: [],
      validate: [maxItems(LIMITS.interestsMax, 'interests'), noDuplicates],
    },
    languages: {
      type: [{ type: String, enum: LANGUAGE_IDS }],
      default: [],
      validate: [maxItems(LIMITS.languagesMax, 'languages'), noDuplicates],
    },
    friendshipGoals: {
      type: [{ type: String, enum: FRIENDSHIP_GOAL_IDS }],
      default: [],
      validate: [maxItems(LIMITS.goalsMax, 'friendship goals'), noDuplicates],
    },
    communities: {
      type: [{ type: String, enum: COMMUNITY_IDS }],
      default: [],
      validate: [maxItems(LIMITS.communitiesMax, 'community spaces'), noDuplicates],
    },

    conversationStyle: { type: String, enum: CONVERSATION_STYLE_IDS }, // optional, one choice

    // "Social energy today" (Milestone 10): optional, private by default, never a streak.
    socialEnergy: {
      level: { type: String, enum: SOCIAL_ENERGY_IDS },
      updatedAt: Date,
    },

    // Set to true when onboarding is finished (Milestone 9).
    // Discover (Milestone 11) only shows complete, discoverable profiles.
    isComplete: { type: Boolean, default: false },

    privacy: { type: privacySchema, default: () => ({}) }, // () => ({}) fills in all the defaults
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        ret.user = ret.user.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// ---- Indexes: make Discover queries fast (Milestone 11) ------------------------
profileSchema.index({ 'privacy.discoverable': 1, isComplete: 1 });
profileSchema.index({ interests: 1 }); // a "multikey" index: one entry per interest

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;