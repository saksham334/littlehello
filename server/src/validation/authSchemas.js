// authSchemas.js — what a valid register / login request must look like.
import { z } from 'zod';
import { emailField, usernameField, newPasswordField, birthDateField } from './fields.js';

// Does the password contain the username or the part of the email before "@"?
function passwordContainsPersonalInfo({ password, username, email }) {
  const lowerPassword = password.toLowerCase();
  const emailName = email.split('@')[0];
  return (
    (username.length >= 3 && lowerPassword.includes(username)) ||
    (emailName.length >= 3 && lowerPassword.includes(emailName))
  );
}

// ---- Register -------------------------------------------------------------
export const registerSchema = z
  .object({
    email: emailField,
    username: usernameField,
    password: newPasswordField,
    birthDate: birthDateField,
    // The sign-up form will have a checkbox. It must be exactly true.
    agreeToGuidelines: z.literal(true, {
      error: 'Please agree to the community guidelines to continue.',
    }),
  })
  // A check that needs SEVERAL fields at once goes on the whole object.
  // "path" says which field the message belongs to.
  .refine((data) => !passwordContainsPersonalInfo(data), {
    error: 'Please don’t include your username or email in your password.',
    path: ['password'],
  });

// ---- Login ----------------------------------------------------------------
// Deliberately SIMPLE: only "is something there?", no strength rules.
//  - Rules can change over time; older accounts must still be able to log in.
//  - Strength messages at login would hint at what a real password looks like.
export const loginSchema = z.object({
  email: z
    .string({ error: 'Please enter your email.' })
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your email.')
    .max(254, 'That email is too long.'),
  password: z
    .string({ error: 'Please enter your password.' })
    .min(1, 'Please enter your password.')
    .max(200, 'That password is too long.'),
});