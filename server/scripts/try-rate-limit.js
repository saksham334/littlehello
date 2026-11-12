// try-rate-limit.js — sends 12 wrong logins in a row to show the login limiter working.
// Run with the API running in another terminal:  npm run try:ratelimit
// Note: afterwards, logins from your computer are blocked for 15 minutes.
//       In development, restarting the server (Ctrl+C, npm run dev) resets the count.

const BASE_URL = 'http://localhost:4000/api';

for (let attempt = 1; attempt <= 12; attempt++) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'ratelimit.demo@example.com', password: 'definitely-the-wrong-password' }),
  });

  const body = await response.json().catch(() => ({}));
  const limitInfo = response.headers.get('ratelimit') ?? '—'; // e.g. "limit=10, remaining=7, reset=899"

  console.log(`Attempt ${String(attempt).padStart(2)}: ${response.status}  ${body.error ?? ''}`);
  console.log(`            RateLimit: ${limitInfo}`);
}