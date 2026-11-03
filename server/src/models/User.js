// User.js — the private ACCOUNT: login details and eligibility.
// What other people see (display name, interests, bio...) will live in a
// separate Profile model (Milestone 8). Keeping them apart protects privacy.
import mongoose from 'mongoose';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { isEligibleAge } from '../utils/age.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;      // something@something.something
const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;            // 3–20 lowercase letters, numbers, _

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,        // removes accidental spaces
      lowercase: true,   // "Mira@Example.com" and "mira@example.com" are the same account
      maxlength: [254, 'Email is too long.'],
      match: [EMAIL_PATTERN, 'Please enter a valid email address.'],
      unique: true,      // creates a unique index (see note below)
    },

    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
      lowercase: true,
      match: [USERNAME_PATTERN, 'Usernames use 3–20 lowercase letters, numbers or underscores.'],
      unique: true,
    },

    // Only the bcrypt hash, never the real password.
    // select: false = NOT included in query results unless we ask for it explicitly.
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    // Private: used only to check eligibility. Never shown to anyone.
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required.'],
      select: false,
      validate: {
        validator: isEligibleAge,
        message: 'LittleHello is for adults aged 18 and over.',
      },
    },

    // For moderation later (Milestone 15). Everyone starts as a regular member.
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },
    accountStatus: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },

    // Used by the onboarding wizard (Milestone 9) to decide where to send new users.
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically

    // Safety net: whenever a user is turned into JSON (e.g. sent in a response),
    // private fields are removed, even if someone forgets to remove them in a route.
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.birthDate;
        return ret;
      },
    },
  },
);

// ---- Instance methods: available on every user document ----

// Hashes and stores a new password. Call before save().
userSchema.methods.setPassword = async function setPassword(plainPassword) {
  this.passwordHash = await hashPassword(plainPassword);
};

// Checks a login attempt. The document must have been loaded with .select('+passwordHash').
userSchema.methods.checkPassword = function checkPassword(plainPassword) {
  if (!this.passwordHash) {
    throw new Error('passwordHash not loaded: query with .select("+passwordHash")');
  }
  return verifyPassword(plainPassword, this.passwordHash);
};

// "User" → MongoDB collection named "users"
const User = mongoose.model('User', userSchema);

export default User;