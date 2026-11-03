// try-validation.js — see the schemas and the validate middleware in action (Milestone 6B).
// Run with:  npm run try:validation
// No database needed: this only checks data.
import { registerSchema, loginSchema } from '../src/validation/authSchemas.js';
import { validate } from '../src/middleware/validate.js';

// Builds a "YYYY-MM-DD" date that is `years` years (and `extraDays` days) before today.
function dateYearsAgo(years, extraDays = 0) {
  const date = new Date();
  date.setUTCFullYear(date.getUTCFullYear() - years);
  date.setUTCDate(date.getUTCDate() + extraDays);
  return date.toISOString().slice(0, 10);
}

// Runs one example and prints the result clearly.
function check(label, schema, input) {
  const result = schema.safeParse(input);
  console.log(`\n${result.success ? '✅ VALID  ' : '❌ INVALID'}  ${label}`);
  if (result.success) {
    console.log('   cleaned data:', { ...result.data, password: '••••••' }); // never print passwords
  } else {
    for (const issue of result.error.issues) {
      console.log(`   • ${issue.path.join('.') || 'form'}: ${issue.message}`);
    }
  }
}

const good = {
  email: 'mira.demo@example.com',
  username: 'mira_reads',
  password: 'tea under the willow',
  birthDate: '1998-04-12',
  agreeToGuidelines: true,
};

console.log('================ REGISTER ================');
check('A good sign-up', registerSchema, good);
check('Messy but fixable (spaces, capitals)', registerSchema, { ...good, email: '  Mira.Demo@Example.COM ', username: ' Mira_Reads ' });
check('Completely empty', registerSchema, {});
check('17 years old', registerSchema, { ...good, birthDate: dateYearsAgo(17) });
check('18th birthday is TOMORROW', registerSchema, { ...good, birthDate: dateYearsAgo(18, 1) });
check('18th birthday is TODAY', registerSchema, { ...good, birthDate: dateYearsAgo(18) });
check('A date that does not exist', registerSchema, { ...good, birthDate: '2001-02-30' });
check('Wrong formats everywhere', registerSchema, { ...good, email: 'mira@', username: 'Mi ra!', password: 'short', birthDate: '12/04/1998' });
check('Reserved username + common password', registerSchema, { ...good, username: 'Admin', password: 'password1234' });
check('Password contains the username', registerSchema, { ...good, password: 'mira_reads forever!' });
check('Did not tick the guidelines box', registerSchema, { ...good, agreeToGuidelines: false });
check('Sneaky extra fields (role: admin)', registerSchema, { ...good, role: 'admin', accountStatus: 'active' });

console.log('\n================ LOGIN ================');
check('A normal login', loginSchema, { email: ' MIRA.demo@example.com', password: 'tea under the willow' });
check('Empty login', loginSchema, { email: '', password: '' });
check('Short password is OK at login (no strength rules)', loginSchema, { email: 'a@b.co', password: 'abc' });

// ---- The middleware, with a pretend request and response ----
console.log('\n================ MIDDLEWARE ================');

function fakeResponse() {
  return {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; }, // returns itself so .json() can chain
    json(body) { console.log(`   → responded ${this.statusCode}:`, JSON.stringify(body, null, 2)); },
  };
}

console.log('\nBad request (email only, no password):');
validate(loginSchema)({ body: { email: 'oops' } }, fakeResponse(), () => console.log('   → next() called'));

console.log('\nGood request:');
const goodRequest = { body: { email: ' Mira@Example.com ', password: 'tea under the willow' } };
validate(loginSchema)(goodRequest, fakeResponse(), () => {
  console.log('   → next() called: the controller would run now');
  console.log('   → req.validated.body.email =', goodRequest.validated.body.email);
});