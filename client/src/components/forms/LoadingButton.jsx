// LoadingButton.jsx — a button that shows a spinner and disables itself while waiting.
// Prevents double-submits (e.g. creating two accounts by clicking twice).
export default function LoadingButton({
  loading = false,
  loadingText = 'Please wait…',
  className = 'btn btn-berry',
  type = 'submit',
  disabled,
  children,
  ...buttonProps
}) {
  return (
    <button type={type} className={className} disabled={loading || disabled} {...buttonProps}>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}