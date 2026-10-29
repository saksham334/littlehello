// InterestChip.jsx — one small pill for an interest like "Cozy games 🎮".
//
// Two modes:
//  1. Display (no onToggle):  <InterestChip label="Tea" shared />
//  2. Toggle  (onToggle):     <InterestChip label="Tea" selected={isOn} onToggle={...} />
//
// Toggle chips are real <button>s with aria-pressed, so keyboards and screen
// readers understand "on/off" without relying on color.

export default function InterestChip({ label, emoji, selected = false, shared = false, onToggle }) {
  // ---- Display mode ----
  if (!onToggle) {
    return (
      <span className={`lh-chip ${shared ? 'lh-chip--shared' : ''}`}>
        {shared && <i className="bi bi-heart-fill" aria-hidden="true"></i>}
        {emoji && <span aria-hidden="true">{emoji}</span>}
        {label}
        {shared && <span className="visually-hidden"> (you both like this)</span>}
      </span>
    );
  }

  // ---- Toggle mode ----
  return (
    <button
      type="button" // without this, a button inside a <form> would submit it!
      className={`lh-chip lh-chip--toggle ${selected ? 'is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onToggle}
    >
      <i className={`bi ${selected ? 'bi-check-lg' : 'bi-plus-lg'}`} aria-hidden="true"></i>
      {emoji && <span aria-hidden="true">{emoji}</span>}
      {label}
    </button>
  );
}