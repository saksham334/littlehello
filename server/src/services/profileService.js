// profileService.js — profile logic that more than one route needs.
// "Services" hold business logic; controllers just handle the HTTP request/response.
import Profile from '../models/Profile.js';

// Returns the user's profile, creating an empty one the first time it's needed.
// This also gives older demo accounts (made before Milestone 8) a profile automatically.
export async function getOrCreateProfile(userId) {
  try {
    return await Profile.findOneAndUpdate(
      { user: userId },
      { $setOnInsert: { user: userId } }, // only applied when CREATING, never on later calls
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
  } catch (err) {
    // Two requests created it at the exact same moment: the unique index stopped
    // the second one, so just read the profile the first one made.
    if (err.code === 11000) return Profile.findOne({ user: userId });
    throw err;
  }
}