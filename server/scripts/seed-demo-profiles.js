// seed-demo-profiles.js — creates 4 clearly labeled DEMO people for testing profiles.
// Run with:  npm run seed:profiles      (safe to run again: it updates instead of duplicating)
// Remove with: npm run demo:clean
// These are NOT real people. Names end in "(demo)", emails use example.com.
import { connectToDatabase, disconnectFromDatabase } from '../src/config/db.js';
import User from '../src/models/User.js';
import { getOrCreateProfile } from '../src/services/profileService.js';

const DEMO_PASSWORD = 'demo passphrase for testing'; // you can log in as these demo people

const DEMO_PEOPLE = [
  {
    email: 'jun.demo@example.com',
    username: 'jun_demo',
    note: 'visible · communities hidden',
    profile: {
      displayName: 'Jun (demo)',
      pronouns: 'he/they',
      avatar: 'cloud',
      bio: 'Introvert who loves cozy games and finding new music. Hobbies over small talk.',
      interests: ['cozy-games', 'lofi-music', 'tea', 'drawing'],
      languages: ['en', 'ko'],
      conversationStyle: 'voice-later',
      friendshipGoals: ['gaming-buddy', 'chat-buddy'],
      communities: ['night-owls'],
      isComplete: true,
    },
  },
  {
    email: 'sam.demo@example.com',
    username: 'sam_demo',
    note: 'visible · pronouns hidden, communities shown',
    profile: {
      displayName: 'Sam (demo)',
      pronouns: 'they/them',
      avatar: 'bubbles',
      bio: 'Looking for a walking buddy and someone to share silly animal photos with.',
      interests: ['nature-walks', 'animals', 'photography', 'reading'],
      languages: ['en', 'fr'],
      conversationStyle: 'short-easygoing',
      friendshipGoals: ['hobby-buddy'],
      communities: ['lgbtq', 'early-birds'],
      isComplete: true,
      privacy: { showPronouns: false, showCommunities: true },
    },
  },
  {
    email: 'ash.demo@example.com',
    username: 'ash_demo',
    note: 'HIDDEN from Discover',
    profile: {
      displayName: 'Ash (demo)',
      avatar: 'star',
      interests: ['writing', 'tea'],
      isComplete: true,
      privacy: { discoverable: false },
    },
  },
  {
    email: 'new.demo@example.com',
    username: 'new_demo',
    note: 'onboarding NOT finished',
    profile: { isComplete: false },
  },
];

try {
  await connectToDatabase();
  console.log('\n🌱 Seeding demo profiles…\n');

  for (const person of DEMO_PEOPLE) {
    // 1. Find or create the demo account
    let user = await User.findOne({ email: person.email });
    if (!user) {
      user = new User({ email: person.email, username: person.username, birthDate: new Date('1995-06-15') });
      await user.setPassword(DEMO_PASSWORD);
    }
    user.onboardingCompleted = Boolean(person.profile.isComplete);
    await user.save();

    // 2. Find or create their profile, then fill it in
    const profile = await getOrCreateProfile(user._id);
    const { privacy, ...fields } = person.profile;
    Object.assign(profile, fields);
    if (privacy) Object.assign(profile.privacy, privacy);
    await profile.save();

    console.log(`   ${(fields.displayName ?? person.username).padEnd(12)} id: ${profile.id}   (${person.note})`);
  }

  console.log(`\n   Demo password for all of them: "${DEMO_PASSWORD}"`);
  console.log('   Copy the ids above into requests/profiles.http\n');
} catch (err) {
  console.error('Seeding failed:', err);
  process.exitCode = 1;
} finally {
  await disconnectFromDatabase();
}