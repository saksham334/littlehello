// NeverSection.jsx — LittleHello's promises, straight from the project's core principles.
const NEVER = [
  'Show likes, follower counts or popularity rankings',
  'Show read receipts or “online now” by default',
  'Use streaks, timers or daily-login rewards',
  'Send guilt-trip notifications',
  'Turn people into a swipe game',
  'Ask for your exact location',
  'Match people on looks or “attractiveness”',
  'Pressure you to share more than you want',
];

export default function NeverSection() {
  return (
    <section className="lh-section" aria-labelledby="never-title">
      <div className="container">
        <div className="lh-card lh-never">
          <div className="text-center mb-4">
            <h2 id="never-title" className="lh-section-title">What we’ll never do</h2>
            <p className="text-soft mt-3 mb-0">Some things make friendship feel like a competition. We left them out on purpose.</p>
          </div>
          <ul className="lh-never__list">
            {NEVER.map((item) => (
              <li key={item}>
                <i className="bi bi-x-circle-fill" aria-hidden="true"></i>
                <span>
                  <span className="visually-hidden">Never: </span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}