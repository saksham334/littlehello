// LoginPage.jsx — log in. Route: /login
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthShell from '../components/auth/AuthShell.jsx';
import FormField from '../components/forms/FormField.jsx';
import PasswordField from '../components/forms/PasswordField.jsx';
import LoadingButton from '../components/forms/LoadingButton.jsx';
import { useAuth } from '../hooks/useAuth.js';

// Login only checks that fields aren't empty, matching the server (6B):
// strength rules at login would hint at what a real password looks like.
function validateAll(values) {
  const errors = {};
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  if (!values.password) errors.password = 'Please enter your password.';
  return errors;
}

function focusField(name) {
  document.getElementById(`login-${name}`)?.focus();
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // If a protected page sent you here (Part 7C), go back there after logging in.
  const redirectTo = location.state?.from?.pathname ?? '/';

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (attempted) setErrors(validateAll(nextValues));
  }

  async function handleSubmit(event) {
    event.preventDefault();
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
      await login({ email: values.email.trim(), password: values.password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message); // e.g. "That email and password don't match…" or the 429 message
      setErrors(err.details ?? {});
      // Clear the password so they can retype it, and put the cursor there.
      setValues((current) => ({ ...current, password: '' }));
      focusField('password');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Good to see you. Log in whenever you’re ready."
      footer={
        <>
          New to LittleHello? <Link to="/register">Create an account</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        {formError && (
          <div className="lh-alert lh-alert--error mb-3" role="alert">
            <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
            <span>{formError}</span>
          </div>
        )}

        <FormField
          id="login-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordField
          id="login-password"
          name="password"
          autoComplete="current-password"
          maxLength={200}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <LoadingButton loading={submitting} loadingText="Logging in…" className="btn btn-berry btn-lg w-100 mt-2">
          Log in
        </LoadingButton>
      </form>
    </AuthShell>
  );
}