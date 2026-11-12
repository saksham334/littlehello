// FormField.jsx — a labeled input with an optional hint and error message,
// wired up for screen readers. Any extra props (type, name, value, onChange,
// autoComplete...) are passed straight to the <input>.
export default function FormField({ id, label, error, hint, optional = false, className = '', ...inputProps }) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  // aria-describedby can list several ids; screen readers read them after the label.
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {optional && <span className="text-soft fw-normal"> (optional)</span>}
      </label>

      <input
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />

      {/* d-block: Bootstrap normally hides .invalid-feedback unless it sits right after the input */}
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