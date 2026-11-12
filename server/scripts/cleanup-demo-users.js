// cleanup-demo-users.js — deletes the clearly labeled DEMO accounts created while testing.
// Run with:  npm run demo:clean
// Only matches emails ending in ".demo@example.com" (plus the 6A test user), never real people.
import { connectToDatabase, disconnectFromDatabase } from '../src/config/db.js';
import User from '../src/models/User.js';

const DEMO_EMAILS = /(\.demo@example\.com|^demo-test-user@example\.com)$/;

try {
  await connectToDatabase();
  const { deletedCount } = await User.deleteMany({ email: DEMO_EMAILS });
  console.log(`🧹 Deleted ${deletedCount} demo account(s).`);
  console.log('   Their old sessions are harmless: requireAuth ends any session whose user no longer exists.');
} catch (err) {
  console.error('Cleanup failed:', err.message);
  process.exitCode = 1;
} finally {
  await disconnectFromDatabase();
}