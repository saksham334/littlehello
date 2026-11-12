// PasswordField.jsx — a password input with a show/hide button.
import { useState } from 'react';

export default function PasswordField({ id, label = 'Password', error, hint, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <div className="lh-password">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {/* A toggle button: its name stays the same, and aria-pressed says on/off */}
        <button
          type="button"
          className="lh-password__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
        >
          <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`} aria-hidden="true"></i>
          <span className="visually-hidden">Show password</span>
        </button>
      </div>

      {error && (
        <div id={errorId} className="invalid-feedback d-block">
          {error}
        </div>
      )}
      {hint && (
        <div id={hintId} className="form-text">
          {hint}
        </div>
      )}
    </div>
  );
}