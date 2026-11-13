// try-profile-model.js — hands-on test of the Profile model (Milestone 8A).
// Run with:  npm run try:profile
// Creates a DEMO user + profile, runs checks, then deletes both.
import { connectToDatabase, disconnectFromDatabase } from '../src/config/db.js';
import User from '../src/models/User.js';
import Profile from '../src/models/Profile.js';
import { getOrCreateProfile } from '../src/services/profileService.js';

const DEMO_EMAIL = 'profile-test.demo@example.com';

// Prints ✅ if saving is rejected (as expected), ❌ if it wrongly succeeds.
async function expectRejected(label, profile) {
  try {
    await profile.validate();
    console.log(`   ❌ ${label}: should have been rejected!`);
  } catch (err) {
    const firstMessage = Object.values(err.errors)[0].message;
    console.log(`   ✅ ${label} → rejected: "${firstMessage}"`);
  }
}

try {
  await connectToDatabase();
  await Promise.all([User.init(), Profile.init()]); // make sure unique indexes exist

  // Clean leftovers from a previous run
  const old = await User.findOne({ email: DEMO_EMAIL });
  if (old) {
    await Profile.deleteOne({ user: old._id });
    await User.deleteOne({ _id: old._id });
  }

  // A demo account to attach the profile to
  const user = new User({ email: DEMO_EMAIL, username: 'profile_demo', birthDate: new Date('1996-09-21') });
  await user.setPassword('a cozy test passphrase');
  await user.save();

  // 1. First call creates the profile, second call returns the SAME one
  console.log('\n1) Get or create…');
  const first = await getOrCreateProfile(user._id);
  const second = await getOrCreateProfile(user._id);
  console.log('   Same profile both times?', first.id === second.id);
  console.log('   New profile:', first.toJSON());

  // 2. Fill it in with valid choices
  console.log('\n2) Saving valid choices…');
  Object.assign(first, {
    displayName: 'Mira (demo)',
    pronouns: 'she/her',
    avatar: 'moon',
    bio: 'New to the city. Quiet cafés and book swaps, please.',
    interests: ['reading', 'tea', 'journaling'],
    languages: ['en', 'fr'],
    conversationStyle: 'slow-thoughtful',
    friendshipGoals: ['chat-buddy', 'hobby-buddy'],
  });
  await first.save();
  console.log('   ✅ Saved:', first.interests, first.languages, first.conversationStyle);

  // 3. Invalid choices are rejected by the model itself
  console.log('\n3) Trying invalid choices…');
  await expectRejected('Made-up interest', new Profile({ user: user._id, interests: ['skydiving-at-midnight'] }));
  await expectRejected('11 interests', new Profile({
    user: user._id,
    interests: ['reading', 'tea', 'coffee', 'baking', 'cooking', 'houseplants', 'puzzles', 'board-games', 'drawing', 'painting', 'writing'],
  }));
  await expectRejected('Duplicate interest', new Profile({ user: user._id, interests: ['tea', 'tea'] }));
  await expectRejected('Unknown avatar', new Profile({ user: user._id, avatar: 'dragon' }));
  await expectRejected('Bio over 300 characters', new Profile({ user: user._id, bio: 'a'.repeat(301) }));
  await expectRejected('Unknown hello setting', new Profile({ user: user._id, privacy: { whoCanSayHello: 'only-cool-people' } }));

  // 4. Only ONE profile per user (unique index)
  console.log('\n4) A second profile for the same user…');
  try {
    await new Profile({ user: user._id }).save();
    console.log('   ❌ Should have been rejected!');
  } catch (err) {
    console.log(err.code === 11000 ? '   ✅ Rejected: one profile per account (error 11000)' : `   ⚠️ ${err.message}`);
  }

  // Clean up
  await Profile.deleteOne({ user: user._id });
  await User.deleteOne({ _id: user._id });
  console.log('\n🧹 Demo user and profile deleted. All done!');
} catch (err) {
  console.error('Something went wrong:', err);
  process.exitCode = 1;
} finally {
  await disconnectFromDatabase();
}