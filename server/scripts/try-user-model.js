// try-user-model.js — a hands-on test of the User model (Milestone 6A).
// Run with:  npm run try:user
// It creates a clearly labeled DEMO user, runs some checks, then deletes it.
import { connectToDatabase, disconnectFromDatabase } from '../src/config/db.js';
import User from '../src/models/User.js';

const DEMO_EMAIL = 'demo-test-user@example.com'; // example.com is reserved for testing
const DEMO_PASSWORD = 'cozy-tea-and-books-42';

async function main() {
  await connectToDatabase();
  await User.init(); // waits until the unique indexes exist, so test 5 is reliable
  await User.deleteOne({ email: DEMO_EMAIL }); // remove leftovers from an earlier run

  // 1. Create a user. Note the messy capitals and space: the schema cleans them.
  console.log('\n1) Creating a DEMO user…');
  const user = new User({
    email: '  Demo-Test-User@Example.com ',
    username: 'Demo_Tester',
    birthDate: new Date('1998-04-12'),
  });
  await user.setPassword(DEMO_PASSWORD);
  await user.save();
  console.log('   Safe JSON version:', user.toJSON());

  // 2. A normal query does NOT include the hash...
  const normal = await User.findById(user._id);
  console.log('\n2) Normal query has passwordHash?', normal.passwordHash !== undefined);

  // ...unless we ask for it explicitly.
  const withHash = await User.findById(user._id).select('+passwordHash');
  console.log('   What is stored instead of the password:', withHash.passwordHash);

  // 3. Checking passwords
  console.log('\n3) Checking passwords…');
  console.log('   Correct password →', await withHash.checkPassword(DEMO_PASSWORD));
  console.log('   Wrong password   →', await withHash.checkPassword('not-my-password'));

  // 4. Under-18 birth dates are refused by the model itself
  console.log('\n4) Trying an under-18 birth date…');
  try {
    const teen = new User({ email: 'teen@example.com', username: 'teen_test', birthDate: new Date() });
    await teen.setPassword('whatever-123');
    await teen.validate(); // runs all the schema rules without saving
    console.log('   ❌ This should NOT have passed!');
  } catch (err) {
    console.log('   ✅ Rejected:', err.errors.birthDate.message);
  }

  // 5. Duplicate emails are refused by the database's unique index
  console.log('\n5) Trying the same email again…');
  try {
    const copy = new User({ email: DEMO_EMAIL, username: 'another_name', birthDate: new Date('1995-01-01') });
    await copy.setPassword('another-pass-123');
    await copy.save();
    console.log('   ❌ This should NOT have been saved!');
  } catch (err) {
    if (err.code === 11000) console.log('   ✅ Rejected: that email is already used (MongoDB error 11000)');
    else throw err;
  }

  // Clean up. Comment this out once if you want to see the user in Atlas.
  await User.deleteOne({ email: DEMO_EMAIL });
  console.log('\n🧹 Demo user deleted. All done!');
}

main()
  .catch((err) => {
    console.error('Something went wrong:', err);
    process.exitCode = 1; // report failure, but still run the finally block
  })
  .finally(() => disconnectFromDatabase());