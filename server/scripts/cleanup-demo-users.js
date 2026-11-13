// cleanup-demo-users.js — deletes the clearly labeled DEMO accounts (and their profiles).
// Run with:  npm run demo:clean
// Only matches emails ending in ".demo@example.com" (plus the 6A test user), never real people.
import { connectToDatabase, disconnectFromDatabase } from '../src/config/db.js';
import User from '../src/models/User.js';
import Profile from '../src/models/Profile.js';

const DEMO_EMAILS = /(\.demo@example\.com|^demo-test-user@example\.com)$/;

try {
  await connectToDatabase();

  const demoUsers = await User.find({ email: DEMO_EMAILS }).select('_id').lean();
  const demoIds = demoUsers.map((u) => u._id);

  // Delete the profiles FIRST, then the accounts (no orphans left behind)
  const profiles = await Profile.deleteMany({ user: { $in: demoIds } });
  const users = await User.deleteMany({ _id: { $in: demoIds } });

  console.log(`🧹 Deleted ${users.deletedCount} demo account(s) and ${profiles.deletedCount} profile(s).`);
} catch (err) {
  console.error('Cleanup failed:', err.message);
  process.exitCode = 1;
} finally {
  await disconnectFromDatabase();
}