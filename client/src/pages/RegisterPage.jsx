// RegisterPage.jsx — create an account. Route: /register
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthShell from '../components/auth/AuthShell.jsx';
import FormField from '../components/forms/FormField.jsx';
import PasswordField from '../components/forms/PasswordField.jsx';
import LoadingButton from '../components/forms/LoadingButton.jsx';
import { useAuth } from '../hooks/useAuth.js';
import {
  validateEmail,
  validateUsername,
  validateNewPassword,
  validateBirthDate,
  latestAllowedBirthDate,
} from '../utils/validators.js';

const INITIAL_VALUES = {
  email: '',
  username: '',
  password: '',
  birthDate: '',
  agreeToGuidelines: false,
};

// Runs every browser check and returns { fieldName: 'message' } for the ones that fail.
function validateAll(values) {
  const errors = {
    email: validateEmail(values.email),
    username: validateUsername(values.username),
    password: validateNewPassword(values.password),
    birthDate: validateBirthDate(values.birthDate),
    agreeToGuidelines: values.agreeToGuidelines ? '' : 'Please agree to the community guidelines to continue.',
  };
  // Keep only fields that actually have a message
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}

// Moves keyboard focus to a field, so people land right on the problem.
function focusField(name) {
  document.getElementById(`register-${name}`)?.focus();
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false); // has the person tried to submit yet?

  // One handler for every field, using the input's "name" attribute.
  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(nextValues);
    // Don't scold while someone types for the first time; after a submit attempt,
    // update messages live so they disappear as soon as things are fixed.
    if (attempted) setErrors(validateAll(nextValues));
  }

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser's own full-page form submit
    setAttempted(true);
    setFormError('');

    const browserErrors = validateAll(values);
    setErrors(browserErrors);
    const firstProblem = Object.keys(browserErrors)[0];
    if (firstProblem) {
      focusField(firstProblem);
      return;
    }

    setSubmitting(true);
    try {
      await register({
        ...values,
        email: values.email.trim(),
        username: values.username.trim().toLowerCase(),
      });
      // New members go into the app. (Milestone 9 will send them to onboarding first.)
      navigate('/discover', { replace: true });
    } catch (err) {
      // The server's verdict: a general message, plus per-field messages if it sent any.
      setFormError(err.message);
      setErrors(err.details ?? {});
      const firstServerProblem = err.details && Object.keys(err.details)[0];
      if (firstServerProblem) focusField(firstServerProblem);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Say a little hello"
      subtitle="Create your account. You can fill in your profile slowly, later."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      {/* noValidate: we show our own friendly messages instead of the browser's pop-ups */}
      <form onSubmit={handleSubmit} noValidate>
        {formError && (
          <div className="lh-alert lh-alert--error mb-3" role="alert">
            <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
            <span>{formError}</span>
          </div>
        )}

        <FormField
          id="register-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          hint="Private. We never show your email to other members."
        />

        <FormField
          id="register-username"
          name="username"
          label="Username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={20}
          value={values.username}
          onChange={handleChange}
          error={errors.username}
          hint="3–20 letters, numbers or _. Friends will see your display name, which you choose later."
        />

        <PasswordField
          id="register-password"
          name="password"
          autoComplete="new-password"
          maxLength={64}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          hint="At least 12 characters. A short phrase is easy to remember and hard to guess."
        />

        <FormField
          id="register-birthDate"
          name="birthDate"
          type="date"
          label="Birth date"
          autoComplete="bday"
          max={latestAllowedBirthDate()}
          value={values.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
          hint="Only used to check you’re 18 or over. Never shown to anyone."
        />

        <div className="form-check mb-4">
          <input
            id="register-agreeToGuidelines"
            name="agreeToGuidelines"
            type="checkbox"
            className={`form-check-input ${errors.agreeToGuidelines ? 'is-invalid' : ''}`}
            checked={values.agreeToGuidelines}
            onChange={handleChange}
            aria-invalid={errors.agreeToGuidelines ? true : undefined}
            aria-describedby={errors.agreeToGuidelines ? 'register-agreeToGuidelines-error' : undefined}
          />
          <label htmlFor="register-agreeToGuidelines" className="form-check-label">
            I’m 18 or older and agree to the{' '}
            <Link to="/#safety" target="_blank" rel="noopener">
              community guidelines
              <span className="visually-hidden"> (opens in a new tab)</span>
            </Link>
            .
          </label>
          {errors.agreeToGuidelines && (
            <div id="register-agreeToGuidelines-error" className="invalid-feedback d-block">
              {errors.agreeToGuidelines}
            </div>
          )}
        </div>

        <LoadingButton loading={submitting} loadingText="Creating your account…" className="btn btn-berry btn-lg w-100">
          <i className="bi bi-flower1" aria-hidden="true"></i> Create my account
        </LoadingButton>

        <p className="lh-note text-center mt-3 mb-0">no pressure, take your time ♡</p>
      </form>
    </AuthShell>
  );
}