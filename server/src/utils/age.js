// age.js — the ONE place that decides whether someone is old enough for LittleHello.
// Used by the User model now, and by request validation in Part 6B.

export const MINIMUM_AGE = 18;
export const MAXIMUM_AGE = 120; // sanity limit: catches typos like the year 1026

// Works out someone's age in whole years on a given day (default: today).
// We use UTC everywhere, because "2000-05-01" from a form is stored as midnight UTC.
export function calculateAge(birthDate, today = new Date()) {
  const birth = new Date(birthDate);

  let age = today.getUTCFullYear() - birth.getUTCFullYear();

  // If their birthday hasn't happened yet this year, they're one year younger.
  const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
  const birthdayNotYet = monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birth.getUTCDate());
  if (birthdayNotYet) age -= 1;

  return age;
}

export function isEligibleAge(birthDate, today = new Date()) {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return false; // not a real date
  const age = calculateAge(birth, today);
  return age >= MINIMUM_AGE && age <= MAXIMUM_AGE;
}